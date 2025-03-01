import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Album {
  userId: number;
  id: number;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  private albumsSubject = new BehaviorSubject<Map<number, Album>>(new Map());
  albums$ = this.albumsSubject.asObservable();
  private apiUrl = 'https://jsonplaceholder.typicode.com/albums'; // API URL
  private albums: Album[] = [];

  constructor(private http: HttpClient) {
    this.loadAlbums();
  }

  private loadAlbums(): void {
    this.http.get<Album[]>(this.apiUrl).subscribe(albums => {
      const albumsMap = new Map<number, Album>();
      albums.forEach(album => albumsMap.set(album.id, album));
      this.albumsSubject.next(albumsMap);
    });
  }

  // Получение списка альбомов
  getAlbums(): Observable<Album[]> {
    return this.albums$.pipe(
      map(albumsMap => Array.from(albumsMap.values()))
    );
  }
  getAlbum(id: number): Observable<any> {
    return this.albums$.pipe(map(albumsMap => albumsMap.get(id)));
  }

  // Добавление нового альбома
  createAlbum(album: Album): Observable<Album> {
    const albumsMap = this.albumsSubject.getValue();
    const newId = albumsMap.size ? Math.max(...albumsMap.keys()) + 1 : 1;
    const newAlbum: Album = { ...album, id: newId };

    albumsMap.set(newId, newAlbum);
    this.albumsSubject.next(new Map(albumsMap));

    return of(newAlbum);
  }

  // Обновление альбома
  updateAlbum(album: Album): Observable<Album> {
    const albumsMap = this.albumsSubject.getValue();
    if (albumsMap.has(album.id)) {
      albumsMap.set(album.id, album);
      this.albumsSubject.next(new Map(albumsMap));
    }

  return of(album);
  }

  // Удаление альбома
  deleteAlbum(id: number): Observable<void> {
    const albumsMap = this.albumsSubject.getValue();
    if (albumsMap.has(id)) {
      albumsMap.delete(id);
      this.albumsSubject.next(new Map(albumsMap));
    }

    return of();
  }
}
