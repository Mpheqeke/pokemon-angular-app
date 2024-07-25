import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PokemonApiConnectorService} from "../pokemon-api-connector.service";
import {CommonModule} from "@angular/common";
import {LoaderComponent} from "../loader/loader.component";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{

  pokemon: any;
  pokemonDetails: any = {};
  error: string | null = null;
  stats: any[] = [];
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonApiConnectorService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const name = params.get('name');
      if (name) {
        this.pokemonService.getPokemonDetails(name).subscribe(
          data => {
            this.pokemonDetails = data;
            this.stats = data.stats || [];
            this.isLoading = false;
          },
          err => {
            this.error = err.message;
            this.isLoading = false;
          }
        );
      }
    });
  }

}
