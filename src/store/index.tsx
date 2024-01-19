import { createContext, useContext, useReducer, Dispatch, ReactNode, Reducer } from 'react';

const defaultValueSidebarUserAccess = { isDashboardOk: false, isReportOk: false, isMasterDataOk: false, isUserOk: false, }
interface SidebarUserAccess {
    isDashboardOk: boolean, isReportOk: boolean, isMasterDataOk: boolean, isUserOk: boolean
}

interface AppState {
    sidebarUserAccess: SidebarUserAccess;
}

const initialState: AppState = {
    sidebarUserAccess: defaultValueSidebarUserAccess
};

type AppAction = {
    type: 'SET_USER_ACCESS' | 'RESET';
    payload: SidebarUserAccess;
};

const AppContext = createContext<{ state: AppState; dispatch: Dispatch<AppAction>; } | undefined>(undefined);

const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case 'SET_USER_ACCESS':
            return { ...state, sidebarUserAccess: action.payload };
        case 'RESET':
            return { ...state, sidebarUserAccess: defaultValueSidebarUserAccess };
        default:
            return state;
    }
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer<Reducer<AppState, AppAction>>(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};