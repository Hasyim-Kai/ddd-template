import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return <main className="w-screen h-screen bg-primary text-white flex items-center justify-center text-center">
                <div>
                    <h1 className="text-7xl mb-12">Something went Wrong ..</h1>
                    <a href={`/web-admin/dashboard/total`}>
                        <button className="text-2xl px-4 py-3 rounded-lg border border-white">Back To Dashboard</button>
                    </a>
                </div>
            </main>;
        }

        return this.props.children;
    }
}