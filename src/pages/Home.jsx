import { Button, Input, Switch, Textarea, useDisclosure } from "@heroui/react";
import React, { useEffect, useMemo, useState } from "react";
import ADDSUBTASK from "../Comonent/ADDSUBTASK";
import toast from "react-hot-toast";
import useToDoStore from "../Store/useToDoStore";
import TaskCard from "../Comonent/TaskCard";
import { nanoid } from "nanoid";
import { useTranslation } from "react-i18next";
import useStoreMode from "../Store/useStoreMode";
import { MdOutlineLightMode } from "react-icons/md";
import { PiMoonThin } from "react-icons/pi";
function Home() {
  const mode = useStoreMode((state) => state.modeWeb);
  const toggleMode = useStoreMode((state) => state.toggleMode);

  const { t, i18n } = useTranslation();
  const con = useToDoStore((state) => state.tasks);
  const addTaskCon = useToDoStore((state) => state.addTask);
  const deleteTaskCon = useToDoStore((state) => state.deleteTask);
  const addSubTaskCon = useToDoStore((state) => state.addSubTask);
  const editTaskCon = useToDoStore((state) => state.editTask);
  const toggleChecked = useToDoStore((state) => state.toggleChecked);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [cHeck, setCHeck] = useState(1);
  const filterData = useMemo(() => {
    if (cHeck === 1) return con;
    if (cHeck === 2) return con.filter((item) => !item.checkStatus);
    return con.filter((item) => item.checkStatus);
  }, [con, cHeck]);

  const [inputTitle, setInputTitle] = useState("");
  const [inputTitleMessage, setInputTitleMessage] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  const [inputDescMes, setInputDescMess] = useState("");
  ///////////////////////////////////////////////////////////
  const [selectedData, setSelectedData] = useState(null);
  const [inputModal, setInputModal] = useState("");
  const [inputModalMessage, setInputModalMessage] = useState("");
  const [inputModalDesc, setInputModalDesc] = useState("");
  const [inputModalDescMes, setInputModalDescMess] = useState("");
  const [conditionId, setConditionId] = useState("");
  useEffect(() => {
    if (!isOpen) {
      setConditionId("");
      clearInputs();
    }
  }, [isOpen]);

  function checkedTaskCompleted(checked, type, objIds) {
    toggleChecked(checked, type, objIds);
  }

  function changeStyle(x) {
    setCHeck(x);
  }

  function AddTask() {
    if (inputTitle.trim().length == 0) {
      setInputTitleMessage(t("required"));
      return;
    } else {
      setInputTitleMessage("");
    }
    if (inputDesc.trim().length == 0) {
      setInputDescMess(t("required"));
      return;
    } else {
      setInputDescMess("");
    }
    const date = new Date();
    const Day = date.toLocaleTimeString();
    const data = {
      id: nanoid(),
      titleTask: inputTitle,
      date: `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} - ${Day}`,
      descTask: inputDesc,
      checkStatus: false,
    };

    addTaskCon(data);
    setInputTitle("");
    setInputDesc("");
    toast.success(t("confirmAddTask"));
  }

  function clearInputs() {
    setInputModalMessage("");
    setInputModalDescMess("");
    setInputModal("");
    setInputModalDesc("");
    onClose();
  }

  function AddSubTask(index) {
    if (inputModal.trim().length == 0) {
      setInputModalMessage(t("required"));
      return;
    } else {
      setInputModalMessage("");
    }
    if (inputModalDesc.trim().length == 0) {
      setInputModalDescMess(t("required"));
      return;
    } else {
      setInputModalDescMess("");
    }

    addSubTaskCon(index, {
      title: inputModal,
      desc: inputModalDesc,
      checkStatus: false,
    });
    clearInputs();
    toast.success(t("confirmAddSubTask"));
  }

  function DeleteTask(type, objIds) {
    deleteTaskCon(type, objIds);
    toast.error(t("deleteTask"));
  }
  function editTask(type, objIds, objIds2) {
    if (type === "task") {
      setInputModal(con[objIds2.id].titleTask);
      setInputModalDesc(con[objIds2.id].descTask);
    } else {
      setInputModal(con[objIds2.id].subTask[objIds2.subId].title);
      setInputModalDesc(con[objIds2.id].subTask[objIds2.subId].desc);
    }

    setConditionId(type);
    onOpen();
  }
  function saveEdit(arr) {
    let [type, objIds] = arr;

    let data = { title: inputModal, desc: inputModalDesc };

    editTaskCon(type, objIds, data);
    clearInputs();
    setConditionId("");
    toast.success(t("updateTask"));
  }
  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);
  return (
    <div className="container sm:w-2/3 xl:w-1/2 px-4 py-8">
      {/* Input Section */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-gray-100 p-8 flex flex-col gap-5">
        <div className="text-center">
          <h1 className="text-4xl font-black text-blue-500">
            {t("titleCard")}
          </h1>
          <p className="text-gray-500 mt-2 font-medium">{t("manageTasks")}</p>
        </div>

        <Input
          label={t("taskTitle")}
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
          variant="bordered"
          isInvalid={!!inputTitleMessage}
          errorMessage={inputTitleMessage}
        />
        <Textarea
          label={t("taskDescription")}
          value={inputDesc}
          onChange={(e) => setInputDesc(e.target.value)}
          variant="bordered"
          isInvalid={!!inputDescMes}
          errorMessage={inputDescMes}
        />
        <Button
          color="primary"
          size="lg"
          className="w-full font-bold shadow-lg shadow-blue-500/20"
          onClick={AddTask}
        >
          {t("addTask")}
        </Button>

        <div className="flex justify-end pt-2">
          <div className="flex items-center gap-4">
            <Switch
              isSelected={i18n.language === "ar"}
              onValueChange={(v) => i18n.changeLanguage(v ? "ar" : "en")}
            >
              {i18n.language === "ar" ? "العربية" : "English"}
            </Switch>
            <span
              onClick={() => toggleMode()}
              className="cursor-pointer text-2xl dark:text-white"
            >
              {mode === "light" ? <PiMoonThin /> : <MdOutlineLightMode />}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-3 my-8">
        {[t("all"), t("uncompleted"), t("completed")].map((item, index) => (
          <button
            key={item}
            onClick={() => setCHeck(index + 1)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
              cHeck === index + 1
                ? "bg-blue-500 text-white shadow-md"
                : "bg-white text-blue-500 border border-blue-200 hover:bg-blue-50"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* List Section */}
      <div className="flex flex-col gap-4">
        {filterData.length > 0 ? (
          filterData.map((item, index) => (
            <TaskCard
              checkedTaskCompleted={checkedTaskCompleted}
              editTask={editTask}
              DeleteTask={DeleteTask}
              index={index}
              onOpen={onOpen}
              setConditionId={setConditionId}
              setSelectedData={setSelectedData}
              item={item}
              key={item.id}
            />
          ))
        ) : (
          <div className="text-center py-16 opacity-60">
            <h2 className="text-2xl font-bold">{t("noTasks")}</h2>
            <p className="text-gray-500">{t("startByAdding")}</p>
          </div>
        )}
      </div>

      {isOpen && (
        <ADDSUBTASK
          index={selectedData}
          saveData={conditionId === "add" ? AddSubTask : saveEdit}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          title={conditionId === "task" ? t("task") : t("sub")}
          header={
            conditionId === "task"
              ? t("editTask")
              : conditionId === "sub"
                ? t("editSubTask")
                : t("addSubTask")
          }
          inputModal={inputModal}
          setInputModal={setInputModal}
          inputModalMessage={inputModalMessage}
          inputModalDesc={inputModalDesc}
          setInputModalDesc={setInputModalDesc}
          inputModalDescMes={inputModalDescMes}
        />
      )}
    </div>
  );
}

export default Home;
