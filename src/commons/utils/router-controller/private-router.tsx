import ModalLoading from "@components/modals/modal-loading";
import useRouterControllerModel from "./router-controller-model";

export default function PrivateRouterContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const model = useRouterControllerModel();
  return (
    <div>
      {children}
      <ModalLoading open={model.loading} />
    </div>
  );
}
