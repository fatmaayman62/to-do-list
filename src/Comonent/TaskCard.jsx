import React from 'react'
import { LuPencilLine } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";

function TaskCard({item,setSelectedData,setConditionId,onOpen,editTask,index,DeleteTask,checkedTaskCompleted}) {
  const { t, i18n } = useTranslation();
  
  return (
    <>
           <div className="p-5 rounded-2xl border-2 shadow  dark:bg-slate-900 dark:text-white border-gray-100">
              <div className="flex justify-between items-center">
                <div className="w-full">
                  <label className=" flex gap-2 items-center">
                    <input
                    checked={item.checkStatus}
                      type="checkbox"
                      onChange={(e) =>
                        checkedTaskCompleted(e.target.checked, "task", {
                          id: item.id,
                        })
                      }
                      className="w-4 h-4"
                      name=""
                    />
                    <span
                      className={`${item.checkStatus ? "line-through italic text-gray-400" : ""} capitalize text-2xl font-semibold1`}
                    >
                      {item.titleTask}
                    </span>
                  </label>
                </div>

                <div className="flex gap-3">
                  <span
                    className="text-2xl text-blue-500 cursor-pointer"
                    onClick={() => {
                      setSelectedData(["task", { id: item.id }]);
                      editTask("task", { id: item.id },{id:index});
                    }}
                  >
                    <LuPencilLine />
                  </span>

                  <span
                    className="text-2xl text-red-500 cursor-pointer"
                    onClick={() => DeleteTask("task", { id: item.id })}
                  >
                    <MdDeleteOutline />
                  </span>
                </div>
              </div>

              <div className="ps-6">
                <span className="text-gray-600 text-sm">{item.date}</span>
                <p
                  className={`${item.checkStatus ? "line-through italic text-gray-400" : ""} text-xl`}
                >
                  {item.descTask}
                </p>

                <div className="my-4">
                  {/* subTask */}
                  {item.subTask &&
                    item.subTask.map((sub, indexSub) => (
                      <div key={indexSub} className="px-8  relative" id="subTask">
                        <div className="px-4 pt-3">
                          <div className="flex items-center justify-between">
                            <label className="flex gap-2 items-center">
                              <input
                                checked={sub.checkStatus}
                                type="checkbox"
                                className="w-4 h-4"
                                onChange={(e) =>
                                  checkedTaskCompleted(
                                    e.target.checked,
                                    "sub",
                                    { id: item.id, subId: indexSub },
                                  )
                                }
                                name=""
                              />
                              <span
                                className={`capitalize text-xl font-semibold ${item.checkStatus || sub.checkStatus ? "line-through italic text-gray-400" : ""}`}
                              >
                                {sub.title}
                              </span>
                            </label>
                            <div className="flex gap-3">
                              <span
                                className="text-xl text-blue-500 cursor-pointer"
                                onClick={() => {
                                  setSelectedData([
                                    "sub",
                                    { id: item.id, subId: indexSub },
                                  ]);
                                  editTask("sub", {
                                    id: item.id,
                                    subId: indexSub,
                                  },{id:index,subId:indexSub});
                                }}
                              >
                                <LuPencilLine />
                              </span>

                              <span
                                className="text-xl text-red-500 cursor-pointer"
                                onClick={() =>
                                  DeleteTask("sub", {
                                    id: item.id,
                                    subId: indexSub,
                                  })
                                }
                              >
                                <MdDeleteOutline />
                              </span>
                            </div>
                          </div>
                          <p
                            className={`${item.checkStatus || sub.checkStatus ? "line-through italic text-gray-400" : ""} px-6 text-[15px]`}
                          >
                            {sub.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <p
                className="text-blue-500 cursor-pointer hover:text-blue-400 "
                onClick={() => {
                  setSelectedData(item.id);
                  setConditionId("add");
                  onOpen();
                }}
              >
                + {t("subTaskBtn")}
              </p>
            </div>
    </>
  )
}

export default TaskCard