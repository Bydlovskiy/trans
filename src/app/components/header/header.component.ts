import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public menuOpen !:any
  private burgerStatus = true;  
  public scroll !: boolean;
  constructor() { }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scrolling, true)
  }

  openMenu(){
    if (this.burgerStatus){
      this.menuOpen =  'block' ;  
      this.burgerStatus = false;    
    } else {
      this.menuOpen =  'none';
      this.burgerStatus = true;
    }
  }

  scrolling=(s :any)=>{
    let sc = s.target.scrollingElement.scrollTop;
    if(sc > 55){this.scroll=true}
    else{this.scroll=false}
  }

}
