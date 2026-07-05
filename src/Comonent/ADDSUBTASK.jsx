import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useTranslation } from "react-i18next";

export default function ADDSUBTASK({
    index,
  saveData,
  isOpen,
  onOpen,
  onOpenChange,
  title,
  header,
  inputModal,
  setInputModal,
  inputModalMessage, 
  inputModalDesc,
  setInputModalDesc,
  inputModalDescMes
}) {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} disableAnimation>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {header}
              </ModalHeader>
              <ModalBody>
                <input
                  type="text"
                  placeholder={`${t("title")} ${title}`}
                  className="outline-0 border-2 border-gray-100 p-2 py-3 focus:border-3 focus:border-gray-300 rounded-xl"
                  onChange={(e)=>setInputModal(e.target.value)}
                  value={inputModal}
                />
                {inputModalMessage && (
          <p className="text-sm text-red-500 -mt-3 ms-2">{inputModalMessage}</p>
        )}
                <textarea
                  placeholder={`${t("desc")} ${title}`}
                    onChange={(e) => setInputModalDesc(e.target.value)}
                    value={inputModalDesc}
                  className="outline-0 border-2 border-gray-100 p-2 py-3 focus:border-3 focus:border-gray-300 rounded-xl"
                ></textarea>
        {inputModalDescMes && <p className="text-sm text-red-500 -mt-3 ms-2">{inputModalDescMes}</p>}

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {t("close")}
                </Button>
                <Button color="primary" onClick={()=>{saveData(index);}}>
                  {t("save")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
