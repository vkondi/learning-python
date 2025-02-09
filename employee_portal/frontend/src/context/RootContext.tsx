import axios from "axios";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export interface EmployeeType {
  address: string;
  designation: string;
  email: string;
  emp_dob: string;
  emp_name: string;
  id: number;
  phone: string;
  salary: number;
}

type EmpPopupActionType = "add" | "edit" | undefined;

interface EmpPopupType {
  open: boolean;
  data: EmployeeType | undefined;
  action?: EmpPopupActionType;
}

interface RootContextType {
  loading: boolean;
  employees: EmployeeType[];
  fetchEmployees: () => void;
  updateEmployee: () => void;
  deleteEmployee: () => void;
  showEmpPopup: boolean;
  empPopupData: EmployeeType | undefined;
  empPopupAction: EmpPopupActionType;
  setEmpPopup: Dispatch<SetStateAction<EmpPopupType>>;
  setShowEmpPopup: (val: boolean) => void;
  setEmpPopupData: (data: EmployeeType) => void;
  setEmpPopupAction: (action: EmpPopupActionType) => void;
}

const RootContext = createContext<RootContextType | undefined>(undefined);

import { ReactNode } from "react";

export const RootProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [empPopup, setEmpPopup] = useState<EmpPopupType>({
    open: false,
    data: undefined,
    action: undefined,
  });

  const fetchEmployees = () => {
    setLoading(true);

    axios
      .get("/api/get-all-employees")
      .then((response) => {
        setEmployees(response?.data ?? []);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateEmployee = () => {
    // TODO: Replace with UPDATE API once it is ready
    axios
      .get("/api/get-all-employees")
      .then((response) => {
        setEmployees(response?.data ?? []);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteEmployee = () => {
    // TODO: Replace with DELETE API once it is ready
    axios
      .get("/api/get-all-employees")
      .then((response) => {
        setEmployees(response?.data ?? []);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const setShowEmpPopup = (value: boolean) => {
    if (value) {
      setEmpPopup((prevEmpPopup) => ({
        ...prevEmpPopup,
        open: value,
      }));
    } else {
      // On hiding empPopup, reset all data
      setEmpPopup({
        open: value,
        data: undefined,
      });
    }
  };

  const setEmpPopupData = (data1: EmployeeType) => {
    setEmpPopup((prevEmpPopup) => ({
      ...prevEmpPopup,
      data: data1,
    }));
  };

  const setEmpPopupAction = (action1: EmpPopupActionType) => {
    setEmpPopup((prevEmpPopup) => ({
      ...prevEmpPopup,
      action: action1,
    }));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <RootContext.Provider
      value={{
        loading,
        employees,
        fetchEmployees,
        updateEmployee,
        deleteEmployee,
        showEmpPopup: empPopup.open,
        empPopupData: empPopup.data,
        empPopupAction: empPopup.action,
        setShowEmpPopup,
        setEmpPopupData,
        setEmpPopupAction,
        setEmpPopup,
      }}
    >
      {children}
    </RootContext.Provider>
  );
};

export const useRootContext = () => {
  const context = useContext(RootContext);
  if (!context) {
    throw new Error("useRootContext must be used within a RootProvider");
  }
  return context;
};
