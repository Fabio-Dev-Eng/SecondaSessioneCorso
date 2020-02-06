import React from "react";
import "./styles.css";

const FINES = [
  {
    id: 1,
    reason: "Eccesso di velocità",
    plate: " ES 222 KS"
  },
  {
    id: 2,
    reason: "Sosta vietata",
    plate: " ES 222 KS"
  },
  {
    id: 3,
    reason: "EAccesso ZTL",
    plate: " ES 333 KS"
  },
  {
    id: 4,
    reason: "Eccesso di velocità",
    plate: " ES 222 KS"
  },
  {
    id: 5,
    reason: "Sosta vietata",
    plate: " ES 222 KS"
  },
  {
    id: 6,
    reason: "EAccesso ZTL",
    plate: " ES 333 KS"
  }
];

const CHECKBOX_EMPTY = "[ ]";
const CHECKBOX_FULL = "[X]";
const CHECKBOX_INDETERMINATE = "[-]";

export default function App() {
  const fines = FINES;
  /* const [selected, setSelected] = React.useState(false) ;*/
  //const [selection, setSelection] = React.useState({});
  const [selection, setSelection] = React.useState(() => {
    // Fake ’till it’s true
    try {
      return JSON.parse(window.sessionStorage.getItem("selection")) || {};
    } catch (e) {
      return {};
    }
  });

  const noSelected = fines.every(fine => !selection[fine.id]);

  const allSelected = fines.every(fine => selection[fine.id]);

  //persistenza del browser simil coockies

  React.useEffect(() => {
    window.sessionStorage.setItem("selection", JSON.stringify(selection));
  });

  //allSelected non è parte dello stato ma dipende dallo stato
  // stato derivato o calcolato

  function handle_headerCheckbox_Click(event) {
    // Se l'utente ha già selezionato
    // tutti gli elementi della tabella
    if (allSelected) {
      // …allora la nuova selezione…
      setSelection(
        // è “vuota”
        {}
      );
    } else {
      // …altrimenti devo produrre una
      // nuova selezione dove tutti
      // gli elementi sono a `true`
      //
      // Creo un nuovo oggetto "vuoto"
      // per la prossima selezione
      const nextSelection = {};
      // per ciascuna multa…
      for (let fine of fines) {
        // imposto la proprietà con il
        // nome pari all'ID della multa
        // a `true`, **mutando** l'oggetto
        // che abbiamo creato.
        nextSelection[fine.id] = true;
      }
      // Dico a React che la nuova
      // selezione è il nuovo oggetto
      // creato
      setSelection(nextSelection);
    }
  }
  return (
    <table>
      <thead>
        <tr>
          <th onClick={handle_headerCheckbox_Click}>
            {allSelected
              ? CHECKBOX_FULL
              : noSelected
              ? CHECKBOX_EMPTY
              : CHECKBOX_INDETERMINATE}
          </th>
          <th>ID</th>
          <th>REASON</th>
          <th>PLATE</th>
        </tr>
      </thead>
      <tbody>
        {fines.map(fine => (
          <FineRow
            key={fine.id}
            fine={fine}
            selected={Boolean(selection[fine.id])}
            onToggle={event => {
              setSelection(selection => ({
                ...selection,
                [fine.id]: !selection[fine.id]
              }));
            }}
          />
        ))}
      </tbody>
    </table>
  );
}

function FineRow({ selected, onToggle, fine }) {
  return (
    <tr key={fine.id}>
      <td onClick={onToggle}>{selected ? CHECKBOX_FULL : CHECKBOX_EMPTY}</td>
      <td>{fine.id}</td>
      <td>{fine.reason}</td>
      <td>{fine.plate}</td>
    </tr>
  );
}

// ... si chiama spread e spalma... prende tutte le proprietà dell'oggetto passato
/*         
        <tr>
          <td>ID</td>
          <td>Targa</td>
          <td>Ragione</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Targa</td>
          <td>Ragione</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Targa</td>
          <td>Ragione</td>
        </tr> */

//.... tutta la selezione precedente di selection
// ...selection, // questa sintassi crea un clone e aggiungiamo delle proprietà
// [fine.id]: !selection[fine.id] //propName : propValue
