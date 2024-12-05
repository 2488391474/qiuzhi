import { useState } from "react";
import "../css/form.css";
import Toast from "../compoment/toast";

// 随机响应成功或者失败结果
// 发送一次请求禁用按钮
// toast 通过接受 isshow 来控制是否显示
// 正则表达式
export default function Form() {
  const [isShowToast, setIsShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [isshowBtn, setIsshowBtn] = useState(true);

  const [formData, setFormData] = useState({
    country: "+86",
    phone: "",
    code: "",
  });
  const [errors, setErrors] = useState({
    phone: "",
    code: "",
  });

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, country: e.target.value });
  };

  // 表单校验
  const validateForm = () => {
    //验证手机号正则
    const phoneReg = /^\d{11}$/;
    const codeReg = /^\d{6}$/;
    let flag = true;
    setMessage("登录失败");
    const obj = { phone: "", code: "" };

    if (!phoneReg.test(formData.phone)) {
      obj.phone = "请输入有效的手机号码";
      flag = false;
    }

    if (!codeReg.test(formData.code)) {
      obj.code = "请输入有效手机号";
      flag = false;
    }

    setErrors(obj);
    if (!flag) return;

    //发送请求部分
    setIsshowBtn(false);
    let message;
    (async function () {
      try {
        message = await randomReslove();
      } catch (error) {
        message = error;
      }
      setMessage(message as string);
      setIsShowToast(true);
      setTimeout(() => {
        setIsShowToast(false);
      }, 2000);

      setIsshowBtn(true);
    })();
  };

  // 随机数模拟登录返回状态
  const randomReslove = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.floor(Math.random() * 2)) {
          resolve("登录成功");
        } else {
          reject("登录失败");
        }
      }, 2500);
    });
  };

  return (
    <>
      <Toast isshow={isShowToast} message={message} key={message}></Toast>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[400px] bg-white  shadow-md">
          <div className="w-full h-[60px] bg-blue-500">
            <h2 className="text-[36px] text-white ml-[20px]">登录</h2>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="w-full h-full flex flex-col gap-5 p-[25px]">
              <div>
                <label className="lable">国家和手机号码</label>
                <div className="flex gap-2 items-center h-[35px]">
                  <select
                    onChange={(e) => handleCountryChange(e)}
                    className="h-full border border-gray-300 rounded-md focus-ring" title="country"
                  >
                    <option value={"+86"}>+86</option>
                    <option value={"+12"}>+12</option>
                    <option value={"+34"}>+34</option>
                    <option value={"+56"}>+56</option>
                  </select>
                  <input
                    type="text"
                    placeholder="请输入手机号"
                    className="outline-none w-full h-full pl-[6px] border focus-ring"
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
                {errors.phone != "" && (
                  <span className="text-red-500 text-[12px]">
                    请输入正确的手机号
                  </span>
                )}
              </div>

              <div>
                <label className="lable">验证码</label>
                <div className="flex gap-2 items-center h-[35px]">
                  <input
                    type="text"
                    placeholder="请输入验证码"
                    className="outline-none w-full h-full pl-[6px] border focus-ring"
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                  />
                  <button className="w-[100px] h-full text-[10px] border hover:border-blue-500">
                    发送验证码
                  </button>
                </div>
                {errors.code != "" && (
                  <span className="text-red-500 text-[12px]">
                    请输入正确的验证码
                  </span>
                )}
              </div>

              <div>
                {isshowBtn ? (
                  <button
                    className={`w-full h-[40px] bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer'`}
                    onClick={validateForm}
                  >
                    登录
                  </button>
                ) : (
                  <button
                    className={`w-full h-[40px] bg-slate-400 text-white rounded-md'`}
                  >
                    登录
                  </button>
                )}
              </div>

              <div className="w-full flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                    />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                    />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                    />
                  </svg>
                </div>
                <div className="text-[12px] hover:text-blue-500 cursor-pointer">
                  注册
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
