import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album, AlbumsService } from '../../services/albums.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  imports: [CommonModule, FormsModule, RouterModule],
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent {
  album: Album | null = null;
  isLoading: boolean = true;
  isEditing: boolean = false;
  editedTitle: string = '';

  constructor(private route: ActivatedRoute, 
    private albumsService: AlbumsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Получаем ID из URL
    this.albumsService.getAlbum(id).subscribe(
      (data) => {
        this.album = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Ошибка при загрузке альбома:', error);
        this.isLoading = false;
      }
    );
  }
  goBack(): void {
    window.history.back();
  }  

  enableEdit(): void {
    this.isEditing = true;
  }
  saveChanges(): void {
    if (this.editedTitle.trim() === '' || !this.album) return;

    const updatedAlbum = { ...this.album, title: this.editedTitle };

    this.albumsService.updateAlbum(updatedAlbum).subscribe(() => {
      if(this.album){
        this.album.title = this.editedTitle;
      }
      this.isEditing = false;
    });
  }
}
