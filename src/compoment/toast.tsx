export default function Toast({ isshow = false, message="登录成功" }) {
  return (
    isshow && (
      <div
        className={`fixed top-0 left-1/2 pt-[10px] pb-[10px] pl-[25px] pr-[25px] -translate-x-1/2 transform text-center border-2 shadow-sm rounded-md text-white
      ${message == "登录成功" ? "bg-green-400" : "bg-red-500"}
      `}
      >
        {message}
      </div>
    )
  );
}
