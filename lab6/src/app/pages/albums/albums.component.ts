import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsService } from '../../services/albums.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})

export class AlbumsComponent {
  albums: any[] = [];
  newAlbumTitle: string = '';
  isLoading: boolean = true;

  constructor(private albumsService: AlbumsService, private router: Router) {}

  ngOnInit(): void {
    this.albumsService.getAlbums().subscribe(
      (data) => {
        this.albums = data;
        console.log('Полученные альбомы:', this.albums);
        this.isLoading = false;
      },
      (error) => {
        console.error('Ошибка при загрузке альбомов:', error);
        this.isLoading = false;
      }
    );
  } 

  goToAlbum(albumId: number): void {
    this.router.navigate(['/albums', albumId]);
  }
  deleteAlbum(id: number): void {
    if (confirm('Do you really wanna delete album?')) {
      this.albumsService.deleteAlbum(id).subscribe(() => {
        this.albums = this.albums.filter(album => album.id !== id);
      });
    }
  }  
  editAlbum(album: any): void {
    const updatedTitle = prompt('Введите новое название альбома:', album.title);
    if (updatedTitle !== null && updatedTitle.trim() !== '') {
      const updatedAlbum = { ...album, title: updatedTitle };
  
      this.albumsService.updateAlbum(updatedAlbum).subscribe(() => {
        album.title = updatedTitle; // Обновляем название прямо в списке
      });
    }
  }
  addAlbum(): void {
    if (!this.newAlbumTitle.trim()) return;
    const newAlbum = { userId: 1, id: Date.now(), title: this.newAlbumTitle };

    this.albumsService.createAlbum(newAlbum).subscribe((album) => {
      this.albums.unshift(album);
      this.newAlbumTitle = '';
    });
  } 
}
