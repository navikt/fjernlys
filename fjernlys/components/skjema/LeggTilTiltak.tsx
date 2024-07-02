import React, { useContext, useEffect, useState } from "react";
import { PlusCircleIcon } from "@navikt/aksel-icons";
import Tiltak from "./Tiltak";
import { DropdownValues } from "@/pages/skjema";
import styles from "@/styles/skjema/tiltak.module.css";
import Dropdown from "./Dropdown";

interface Props {
  riskID: string;
}

type TestListeElement = [string, string];
const LeggTilTiltak = ({ riskID }: Props) => {
  const context = useContext(DropdownValues);
  if (!context) {
    throw new Error("No context");
  }
  const [showDropdown, setShowDropdown] = useState(false);

  const [tiltakList, setTiltakList] = useState<
    { id: string; element: JSX.Element }[]
  >([]);

  const [testListe, setTestListe] = useState<TestListeElement[]>([]);

  // const deleteTiltak = (tiltakID: string) => {
  //   setTiltakList((prevList) =>
  //     prevList.filter((item) => item.id !== tiltakID)
  //   );
  // };

  const deleteTiltak = (tiltakIDNum: number) => {
    setTestListe((prevList) =>
      prevList.filter((_, index) => index !== tiltakIDNum)
    );
    setTiltakList([]);
    setTimeout(generateTing, 0);
  };

  const addTiltak = (id: number, category: string, dependant: string) => {
    const newId = `${id}`;
    const riskId = riskID;
    setTiltakList((prevList) => [
      ...prevList,
      {
        id: newId,
        element: (
          <Tiltak
            key={newId}
            tiltakIDNum={id}
            riskID={riskId}
            deleteTiltak={deleteTiltak}
            category={category}
            dependant={dependant}
            updateListe={updateListe}
          />
        ),
      },
    ]);
  };

  useEffect(() => {
    if (tiltakList.length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [tiltakList]);

  const generateTing = () => {
    if (testListe.length > 0) {
      for (let i = 0; i < testListe.length; i++) {
        const newId = i;
        const riskId = riskID;
        console.log(newId, riskID);
        addTiltak(newId, testListe[i][0], testListe[i][1]);
        console.log("Hit");
      }
    } else {
      const element: TestListeElement = ["personvern", "1"];
      setTestListe((prevList) => [...prevList, element]);
      addTiltak(0, "personvern", "1");
      console.log("her");
    }
  };

  const updateListe = (id: number, category: string, dependant: string) => {
    if (testListe.length > 0) {
      testListe[id][0] = category;
      testListe[id][1] = dependant;
      console.log(testListe);
    }
  };

  return (
    <div className={styles.parentDiv}>
      <div>
        {tiltakList.map(({ id, element }) => (
          <div key={id} style={{ marginTop: "5px" }}>
            {element}
          </div>
        ))}
      </div>
      <div className={styles.actionDiv}>
        <PlusCircleIcon
          className="leggTil"
          fontSize={"1.5rem"}
          onClick={generateTing}
        />
        <div className={styles.actionText}>Legg til Tiltak</div>
        {showDropdown && (
          <Dropdown title={""} formKey={""} setVerdi={undefined} />
        )}
      </div>
    </div>
  );
};

export default LeggTilTiltak;
