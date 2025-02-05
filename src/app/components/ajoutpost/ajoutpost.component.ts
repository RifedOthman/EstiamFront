import { Component, OnInit } from '@angular/core';
import { SyncvoteService } from 'src/app/services/syncvote.service';

@Component({
  selector: 'app-ajoutpost',
  standalone: true,
  imports: [],
  templateUrl: './ajoutpost.component.html',
  styleUrl: './ajoutpost.component.scss'
})
export class AjoutpostComponent implements OnInit {
  posts: any[] = [];
  loading: boolean = true;
  error: string = '';
  constructor(private syncvoteService: SyncvoteService) { }

  ngOnInit(): void {
   
  }


}
