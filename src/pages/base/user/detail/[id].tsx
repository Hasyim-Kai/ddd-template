import Breadcrumbs from "@components/breadcrumbs/breadcrumbs";
import ModalChangePassword from "@components/modals/ModalChangePassword";
import ModalImage from "@components/modals/ModalImage";
import { ArrowLeft, EditIcon, LockIcon } from "lucide-react";
import useUser from "../_user-view-model";
import defaultPhoto from "@assets/default_avatar.jpg";
import Loading from "@components/loading/loading";
import ModalSuccess from "@components/modals/ModalSuccess";
import { addBaseAssetUrlBE } from "@commons/utils/config";


export default function UserDetails() {
  const model = useUser("user-detail");
  return (
    <main className="flex flex-col gap-[28px] justify-between">
      <ModalChangePassword
        open={model.openModalChangePwd}
        setOpen={model.setOpenModalChangePwd}
        changePasswordCb={model.onChangePassword} />
      <ModalImage
        open={model.openModalPic}
        setOpen={model.setOpenModalPic}
        imgSrc={addBaseAssetUrlBE(model.userDetail.avatarPath)}
      />
      <ModalSuccess
        open={model.openModalSuccess}
        setOpen={model.setOpenModalSuccess}
      />
      <Breadcrumbs
        data={[
          { name: `User`, link: `user`, },
          { name: 'Detail', link: 'detail', },
        ]}
      />

      <div className="p-7 rounded-md border border-[#D0D3D9] bg-white">
        {/* TEXT HEAD */}
        <div className="w-full flex items-center justify-between pb-4 border-b border-[#D0D3D9]">
          <div>
            <span className="text-2xl text-[#514E4E] font-bold ">
              User Details
            </span>
            <p className="text-[#667085]">Account & Access Information</p>
          </div>
          <div className="flex gap-3">
            <button
              className="flex items-center gap-2 text-sm h-[46px] px-[20px] border text-red-500 border-red-500 rounded-xl"
              onClick={() => model.navigate(-1)}>
              <ArrowLeft color="red" size={16} />
              <span className="font-semibold">Back</span>
            </button>
            <button
              className="flex justify-center items-center gap-2 text-sm h-[46px] px-[20px] text-white bg-red-400 rounded-xl"
              onClick={() => model.navigate(`../../edit/${model.id}`)}>
              <EditIcon color="white" size={16} />
              <span className="font-semibold">Edit User</span>
            </button>
          </div>
        </div>

        {/* PIC */}
        <div className="w-1/2 py-[18px] border-b flex gap-8">
          <img className="w-[120px] rounded-full" src={addBaseAssetUrlBE(model.userDetail.avatarPath)} defaultValue={defaultPhoto} alt="Profile Pic" />
          <button className="underline text-blue-600 font-semibold"
            onClick={() => model.setOpenModalPic(true)}>View Photo</button>
        </div>

        {/* General Info */}
        {model.isLoading
          ? <Loading />
          : <section className="flex flex-col gap-5">
            <h1 className="font-semibold mt-5 mb-3">General Information</h1>
            <div>
              <p className="text-gray-400 text-sm">Status</p>
              {model.userDetail.isActive
                ? <p className="text-green-500 font-semibold">Active</p>
                : <p className="text-red-500 font-semibold">Inactive</p>}
            </div>

            <div className="flex gap-20">
              {/* COL 1 */}
              <div className="flex flex-col gap-5">
                <div>
                  <p className="text-gray-400 text-sm">Name</p>
                  <p className=" font-semibold">{model.userDetail.name}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className=" font-semibold">{model.userDetail.email}</p>
                </div>
              </div>
              {/* COL 2 */}
              <div className="flex flex-col gap-5">
                <div>
                  <p className="text-gray-400 text-sm">Role</p>
                  <p className=" font-semibold">{model.userDetail?.role}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Password</p>
                  <button
                    className="flex justify-center items-center gap-2 text-sm h-[46px] px-[20px] text-white bg-red-400 rounded-xl"
                    onClick={() => model.setOpenModalChangePwd(true)}>
                    <LockIcon color="white" size={17} />
                    <span className="font-semibold">Update Password</span>
                  </button>
                  {/* <span className="text-xs text-red-500">Last update two months ago</span> */}
                </div>
              </div>
            </div>
          </section>}
      </div>
    </main>
  );
}
