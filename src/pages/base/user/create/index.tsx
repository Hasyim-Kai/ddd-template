
import Breadcrumbs from "@components/breadcrumbs/breadcrumbs";
import { ArrowLeft, ArrowUpToLine, EyeIcon, EyeOffIcon, SaveIcon } from "lucide-react";
import ModalImage from "@components/modals/ModalImage";
import ModalConfirm from "@components/modals/ModalConfirm";
import ModalSuccess from "@components/modals/ModalSuccess";
import useCreateUser from "./_user-create-model";
import Loading from "@components/loading/loading";
import ModalFail from "@components/modals/ModalFail";

export default function UserForm() {
  const model = useCreateUser();
  const labelStyle = `text-sm`;

  return (
    <main className="flex flex-col gap-[28px] justify-between">
      <Breadcrumbs
        data={[
          {
            name: `User`,
            link: `/web-admin/user`,
          },
          {
            name: "Create",
            link: "create",
          },
        ]}
      />

      <div className="p-7 rounded-md border border-[#D0D3D9] bg-white">
        {/* TEXT HEAD */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-[#D0D3D9]">
          <span className="text-2xl text-[#514E4E] font-bold ">
            Create New User
          </span>
          <button
            className="flex items-center gap-2 text-sm h-[46px] px-[20px] border text-red-500 border-red-500 rounded-xl"
            onClick={() => model.navigate(-1)}>
            <ArrowLeft color="red" size={16} />
            <span className="font-semibold">Back</span>
          </button>
        </div>

        {/* FORM */}
        <form className="w-3/4 flex py-[18px] gap-5 flex-wrap"
          onSubmit={model.handleSubmit(model.onCreate)}        >
          <div className="pt-2 flex flex-col w-full gap-1">
            <span className={labelStyle}>Name</span>
            <input
              {...model.register("name", { required: true })}
              type="text"
              className={`h-[40px] border border-[#D0D3D9] rounded px-2 ${model.errors.name ? "bg-red-100" : "bg-white"}`} />
          </div>
          <div className="pt-2 flex flex-col w-full gap-1">
            <span className={labelStyle}>Email</span>
            <input
              {...model.register("email", { required: true })}
              type="email"
              className={`h-[40px] border border-[#D0D3D9] rounded px-2 ${model.errors.email ? "bg-red-100" : "bg-white"}`} />
          </div>

          {/* ROLE SELECT */}
          {model.isLoading ? <Loading />
            : <div className="flex flex-col w-full gap-1">
              <span className={labelStyle}>Role</span>
              <select
                {...model.register("roleId", { required: true })}
                className={`h-[40px] border border-[#D0D3D9] rounded px-2 ${model.errors.roleId ? "bg-red-100" : "bg-white"}`}>
                {model.roleList.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}
              </select>
            </div>}

          <div className="w-full pt-2 flex flex-col gap-1">
            <span className={labelStyle}>Password</span>
            <div className="flex items-center gap-3">
              <input
                {...model.register("password", { required: true })}
                type={model.isPasswordShow ? "text" : "password"}
                className={`w-full h-[40px] border border-[#D0D3D9] rounded px-2 ${model.errors.password ? "bg-red-100" : "bg-white"}`} />
              <div className="w-[30px] h-[30px] cursor-pointer" onClick={model.onPasswordToggle} >
                {model.isPasswordShow ? <EyeOffIcon color="black" /> : <EyeIcon color="black" />}
              </div>
            </div>
          </div>

          {/* PROFILE PIC INPUT */}
          <div className="pt-2 flex flex-col w-full gap-1 relative">
            <span className={labelStyle}>Profile Picture</span>

            <div className={`flex justify-between items-center border border-[#D0D3D9] rounded-lg p-2 
              ${model.errors.avatarPath ? "bg-red-100" : "bg-white"}`}>
              <div className={`max-w-[34rem] py-1 px-2 bg-[#D0D3D9] text-[#667085] rounded flex items-center justify-center gap-1 cursor-pointer`}>
                {model.profilePic
                  ? <span className="font-semibold text-sm text-ellipsis truncate">{model.profilePic.name}</span>
                  : <>
                    <ArrowUpToLine size={14} />
                    <span className="font-semibold text-sm">Upload File</span>
                  </>}

              </div>
              <button className="inline w-fit text-blue-500 underline cursor-pointer text-sm" type="button"
                onClick={() => model.setOpenModalPic(true)}>
                View Photo
              </button>
            </div>

            <input
              {...model.register("avatarPath", { required: true })}
              onChange={model.onChangeFile}
              type="file" accept="image/*"
              className={`absolute h-full bg-transparent opacity-0 outline-none cursor-pointer`} />

            <p className="text-red-300 text-sm">Max file size 5MB
              {model.isFileLimitExceed ? <span className="font-bold"> - 5MB Exceeded</span> : null}
            </p>
          </div>

          <button
            disabled={model.isFileLimitExceed}
            className={`flex justify-center items-center gap-2 w-[250px] h-[46px] px-[20px] rounded-xl ${model.isFileLimitExceed ? 'bg-gray-500 ' : 'bg-red-500'}`}>
            <SaveIcon color="white" size={16} />
            <span className="text-white text-sm font-semibold">Save</span>
          </button>
        </form>
      </div>

      <ModalConfirm
        isLoading={model.isLoading}
        open={model.openModalConfirm}
        setOpen={model.setOpenModalConfirm}
        cb={model.onConfirmCreate} />
      <ModalSuccess
        open={model.openModalSuccess}
        setOpen={model.setOpenModalSuccess}
        cb={() => model.navigate(-1)} />
      <ModalFail
        open={model.openModalFail}
        setOpen={model.setOpenModalFail}
        errMsg={model.errorMessage} />
      <ModalImage
        open={model.openModalPic}
        setOpen={model.setOpenModalPic}
        imgSrc={model.previewUrl} />
    </main>
  );
}
