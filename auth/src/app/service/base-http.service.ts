import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export abstract class BaseHttpService<T extends {id?: number}> {

  http: HttpClient = inject(HttpClient);

  apiUrl = environment.apiUrl;

  constructor(
    private entityName: string
  ) { }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}${this.entityName}`);
  }

  get(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${this.entityName}/${id}`);
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(
      `${this.apiUrl}${this.entityName}`,
      entity,
    );
  }

  update(entity: T): Observable<T> {
    return this.http.patch<T>(
      `${this.apiUrl}${this.entityName}/${entity.id}`,
      entity,
    );
  }

  delete(entity: T): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${this.entityName}/${entity.id}`);
  }
}
