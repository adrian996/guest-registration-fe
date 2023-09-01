import { Table } from "react-bootstrap";
import "./EventList.css";

export default function EventList(props: { value: string }) {
  const heading = props.value;

  return (
    <>
      <div className="table_wrapper">
        <div className="table_heading">{heading}</div>
        <Table className="table table-borderless">
          <tbody className="table_body">
            <tr>
              <td>1</td>
              <td>Event 1</td>
              <td>01.01.2023</td>
              <td>OSAVÕTJAD</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Event 2</td>
              <td>01.01.2023</td>
              <td>OSAVÕTJAD</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Event 3</td>
              <td>01.01.2023</td>
              <td>OSAVÕTJAD</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}
