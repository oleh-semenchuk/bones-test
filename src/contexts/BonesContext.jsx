import { createContext, useEffect, useState } from "react";
import { s3 } from "../api/S3Service.js";

export const BonesContext = createContext({
  data: {
    test: [],
    train: [],
    valid: [],
  },
  tab: "",
  setTab: () => undefined,
});

export const S3_URL = "https://s3.eu-central-1.amazonaws.com/";

export const ALBUM_BUCKET_NAME = "dataspan.frontend-home-assignment";

export const ALBUM_MAIN_FOLDER = "bone-fracture-detection";

const fetchListObjectsByPath = async (path, onData) => {
  const data = (
    await s3
      .listObjects({
        Prefix: `${ALBUM_MAIN_FOLDER}/${path}/thumbnails`,
        MaxKeys: 100,
      })
      .promise()
  ).Contents;

  const dataWithLabels = await Promise.all(
    data.map(async ({ Key }) => {
      const lowResPath = S3_URL + ALBUM_BUCKET_NAME + "/" + Key;
      const highResPath = lowResPath.replace("thumbnails", "images");
      const label = Key.split("/").pop();

      const file = await (
        await fetch(
          lowResPath.replace("thumbnails", "labels").replace(".jpg", ".txt")
        )
      ).text();

      const rows = file.split("\n").reduce((acc, curr) => {
        const splitRow = curr.split(" ");

        if (splitRow.length > 1) {
          acc.push({
            className: splitRow[0],
            coords: splitRow.splice(1).map(Number),
          });
        }

        return acc;
      }, []);

      return {
        key: Key,
        label,
        lowResPath,
        highResPath,
        labels: rows,
      };
    })
  );

  onData(dataWithLabels);
};

export const BonesContextProvider = ({ children }) => {
  const [test, setTest] = useState([]);
  const [train, setTrain] = useState([]);
  const [valid, setValid] = useState([]);

  const [tab, setTab] = useState("");

  useEffect(() => {
    fetchListObjectsByPath("test", setTest);
    fetchListObjectsByPath("train", setTrain);
    fetchListObjectsByPath("valid", setValid);
  }, []);

  return (
    <BonesContext.Provider
      value={{
        data: {
          test,
          train,
          valid,
        },
        tab,
        setTab,
      }}
    >
      {children}
    </BonesContext.Provider>
  );
};
