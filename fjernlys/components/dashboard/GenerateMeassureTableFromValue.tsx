import { Table } from "@navikt/ds-react";
import React, { useState } from "react";

type MeasureValuesType = {
  id: string;
  risk_assessment_id: string;
  category: string;
  status: string;
};

interface Props {
  measure: MeasureValuesType[];
}

function GenerateMeasureTableFromValue({ measure }: Props) {
  return (
    <>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell scope="col">Risiko ID</Table.HeaderCell>
            <Table.HeaderCell scope="col">Kategori</Table.HeaderCell>
            <Table.HeaderCell scope="col">Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {measure.map((item, index) => (
            <Table.Row content={""}>
              <Table.DataCell></Table.DataCell>
              <Table.DataCell scope="row">{`T${index + 1}`}</Table.DataCell>
              <Table.DataCell>{item.category}</Table.DataCell>
              <Table.DataCell>{item.status}</Table.DataCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}

export default GenerateMeasureTableFromValue;
