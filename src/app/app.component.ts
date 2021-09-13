import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { of } from "rxjs";
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';
import { GetService } from './get.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Adobe';
  pageInfo: any = [];
  collection: any = [];
  pageNumber: number = 0;
  isLastPage: boolean = false;
  searchResult: any = [];


  @ViewChild('searchInput', { static: true }) 
  isSearching: boolean = false;
  constructor(public httpdata: GetService, public searchInput: ElementRef) { }

  ngOnInit() {

    this.loadNextPage()
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(

      // get value
      map((event: any) => {
        return event.target.value;
      })
      // if character length greater then 2
      , filter(res => res.length > 2)

      // Time in milliseconds between key events
      , debounceTime(500)

      // If previous query is diffent from current   
      , distinctUntilChanged()

      // subscription for response
    ).subscribe((text: string) => {
      this.isSearching = true;
      this.searchByName(text);

    });
  }
  loadNextPage() {
    this.pageNumber += 1;
    this.httpdata.getdata(this.pageNumber).subscribe((res: any) => {
      if (res.data.length == 0) {
        this.isLastPage = true;
        return;
      }
      this.pageInfo = this.pageInfo.concat(res.data);
      this.searchResult = this.pageInfo;
    })
  }
  searchByName(query: string) {
    let temp: any = [];
    this.pageInfo.forEach((element:any) => {
      if (element.first_name.toLowerCase().startsWith(query.toLowerCase())) {
        temp.push(element)
      }
    });
   
    this.searchResult=temp;
  }
}