import { useContext } from "react";
import { BonesContext } from "../contexts/BonesContext.jsx";

export const useBonesContext = () => useContext(BonesContext);
