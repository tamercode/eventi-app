

// aggiunge zero se un numero è minore di 10 es. 3 --> 03 (utile per formattare le date es. 1-3-2018 --> 01-03-2018 )

 function  addZero (n: number) {
        return n < 10 ? '0' + n : n;
    }


// formatta la data nel seguente formato stringa '2018-03-01' yyyy-mm-dd
 function formatDateToStr (date: Date): string {

    return date.getFullYear() + '-' + addZero(date.getMonth() + 1) + '-' + addZero(date.getDate());
 }

 // literal date

 function literalDate (_date: Date) {

  const data = _date;
  let set, gg, mm, aaaa, h, m, s;
  const array: string[] = [];
  // Crea la tabella dei mesi
  const mesi = new Array();
     mesi[0] = 'Gennaio';
     mesi[1] = 'Febbraio';
     mesi[2] = 'Marzo';
     mesi[3] = 'Aprile';
     mesi[4] = 'Maggio';
     mesi[5] = 'Giugno';
     mesi[6] = 'Luglio';
     mesi[7] = 'Agosto';
     mesi[8] = 'Settembre';
     mesi[9] = 'Ottobre';
     mesi[10] = 'Novembre';
     mesi[11] = 'Dicembre';
  // Crea la tabella dei giorni della settimana
  const giorni = new Array();
     giorni[0] = 'Domenica';
     giorni[1] = 'Lunedì';
     giorni[2] = 'Martedì';
     giorni[3] = 'Mercoledì';
     giorni[4] = 'Giovedì';
     giorni[5] = 'Venerdì';
     giorni[6] = 'Sabato';
        // Estrae dalla tabella il giorno della settimana
        set = giorni[data.getDay()] + ' ' ;
        gg = data.getDate() + ' ' ;
        // Estrae dalla tabella il mese
        mm = mesi[data.getMonth()] + ' ' ;
        aaaa = data.getFullYear();
        h = data.getHours() + ':';
        m = data.getMinutes() + ':';
        s = data.getSeconds();

        array['week'] = set;
        array['day'] = gg;
        array['month'] = mm;
        array['year'] = aaaa;
        array['hour'] = h;
        array['minutes'] = m;
        array['second'] = s;
        return array;

 }

    export {addZero, formatDateToStr, literalDate };
