import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotosService } from '../../services/photos.service';
import { CommonModule } from '@angular/common';

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

@Component({
  selector: 'app-album-photos',
  templateUrl: './album-photos.component.html',
  imports: [CommonModule],
  standalone: true,
  styleUrls: ['./album-photos.component.css']
})
export class AlbumPhotosComponent implements OnInit {
  photos: Photo[] = [];
  albumId: number = 0;

  constructor(private route: ActivatedRoute, private photosService: PhotosService) {}

  ngOnInit(): void {
    this.albumId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.albumId) {
      this.photosService.getPhotosByAlbum(this.albumId).subscribe((data) => {
        this.photos = data.map(photo => ({
          ...photo,
          url: `https://picsum.photos/600?random=${photo.id}`,
          thumbnailUrl: `https://picsum.photos/150?random=${photo.id}`
        }));
      });
    }
  }
}
