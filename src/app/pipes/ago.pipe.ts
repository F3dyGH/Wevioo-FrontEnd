import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ago'
})
export class AgoPipe implements PipeTransform {

  transform(value: any): string {
    const date = this.parseLocalDateTime(value);
    const currentDate = new Date();
    const diffInMilliseconds = currentDate.getTime() - date.getTime();
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    } else if(diffInSeconds < 172800){
      const days = Math.floor(diffInSeconds / 86400);
      return days === 1 ? '1 day ago' : `${days} ago`
    } else {
      const formattedDate = date.toLocaleDateString('en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      return formattedDate
    }
  }
  private parseLocalDateTime(localDateTime: string): Date {
    const [datePart, timePart] = localDateTime.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes, seconds);
  }
}
