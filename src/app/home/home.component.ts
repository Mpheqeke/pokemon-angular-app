import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterModule} from "@angular/router";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {PokemonApiConnectorService} from "../pokemon-api-connector.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LoaderComponent} from "../loader/loader.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    MatCardContent,
    MatCard,
    MatCardTitle,
    CommonModule,
    FormsModule,
    RouterModule,
    LoaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  pokemonList: any[] = [];
  filteredPokemonList: any[] = [];
  error: string | null = null;
  searchQuery: string = '';
  isLoading: boolean = true;
  constructor(private pokemonService: PokemonApiConnectorService, private router : Router) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonList().subscribe(data => {
      debugger
      this.pokemonList = data;
      this.filteredPokemonList = data;
        this.isLoading = false;
    },
        err => {
          this.error = err.message;
          this.isLoading = false;
        });
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.filteredPokemonList = this.pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  handleCardClick(name: string): void {
    this.router.navigate(['/details', name]);
  }

}
