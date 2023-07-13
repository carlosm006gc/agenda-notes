import { Pipe, PipeTransform } from '@angular/core';
import { format, parseISO } from 'date-fns';

@Pipe({
  name: 'localDateTimePipe'
})
export class LocalDateTimePipe implements PipeTransform {

  transform(date: string): string {
    const dateObj = parseISO(date);
    const formattedDate = format(dateObj, 'dd-MM-yyyy HH:mm');
    console.log(formattedDate)
    return formattedDate;
  }

}
