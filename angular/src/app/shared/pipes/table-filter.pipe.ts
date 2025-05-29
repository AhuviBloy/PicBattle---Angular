import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter',
  standalone: true
})
export class TableFilterPipe implements PipeTransform {
  transform(users: any[], searchText: string): any[] {
    if (!users || !searchText) return users;

    searchText = searchText.toLowerCase();

    return users.filter(user =>
      (user.name || user.username || '').toLowerCase().includes(searchText) ||
      (user.email || '').toLowerCase().includes(searchText) ||
      (user.id?.toString() || '').includes(searchText)
    );
  }
}
