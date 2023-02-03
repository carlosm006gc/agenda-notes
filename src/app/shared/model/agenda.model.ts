import { SafeResourceUrl } from '@angular/platform-browser';

export class Note {
    id: string;
    title: string;
    agendaBody: string;
    agendaDate: string;
    agendaTime: string;
    registrationDate: string;
    urlSafe: SafeResourceUrl;
}