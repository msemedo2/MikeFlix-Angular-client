import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
//Material design
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
//Components
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  onToggleFavoriteMovie(id: string): any {
    if (this.isFav(id)) {
      this.fetchApiData.removeFavoriteMovie(id).subscribe((resp: any) => {
        this.snackBar.open('Removed from favorites!', 'OK', {
          duration: 2000,
        });
      });
      const index = this.favorites.indexOf(id);
      return this.favorites.splice(index, 1);
    } else {
      this.fetchApiData.addFavoriteMovie(id).subscribe((response: any) => {
        this.snackBar.open('Added to favorites!', 'OK', {
          duration: 2000,
        });
      });
    }
    return this.favorites.push(id);
  }

  isFav(id: string): boolean {
    return this.favorites.includes(id);
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: {
        name,
        description,
      },
    });
  }

  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { name, bio },
    });
  }
}
