import { Select, Table } from "@navikt/ds-react";
import React, { useEffect, useState } from "react";
import styles from "@/styles/skjema/information.module.css";
import { getData } from "@/pages/api/getData";
import { get } from "http";

type reportType = {
  id: string;
  is_owner: boolean;
  owner_ident: string;
  report_created: string;
  report_edited: string;
};

function ShowReports() {
  const [service, setService] = useState("Ikke valgt");
  const [serviceId, setServiceId] = useState<reportType[]>([]);

  const handleChange = async (service: string) => {
    setService(service);
    setServiceId(await getData(service));
  };

  useEffect(() => {
    console.log(serviceId);
  }, [serviceId]);
  return (
    <>
      {" "}
      <div className={styles.selectDiv}>
        <div className={styles.dropdownDiv}>
          <Select
            label={"Ytelse/tjeneste"}
            onChange={(e) => handleChange(e.target.value)}
            value={service}
          >
            <option value="Ikke valgt" disabled>
              Velg ytelse/tjeneste
            </option>
            <option value="Alderpensjon">Alderpensjon</option>
            <option value="Uføretrygd">Uføretrygd</option>
            <option value="AAP">AAP</option>
            <option value="Sykepenger">Sykepenger</option>
            <option value="Dagpenger">Dagpenger</option>
            <option value="Foreldrepenger">Foreldrepenger</option>
            <option value="Utbetaling">Utbetaling</option>
          </Select>
        </div>
      </div>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell scope="col">Tjeneste/Ytelse</Table.HeaderCell>
            <Table.HeaderCell scope="col">Eier</Table.HeaderCell>
            <Table.HeaderCell scope="col">Antall Risiko</Table.HeaderCell>
            <Table.HeaderCell scope="col">Opprettet</Table.HeaderCell>
            <Table.HeaderCell scope="col">Endret</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body></Table.Body>
      </Table>
    </>
  );
}

export default ShowReports;