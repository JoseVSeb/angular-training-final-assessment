import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should render nav links', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const navLinks = [
      { routerLink: "register", value: "Register" },
      { routerLink: "view", value: "View" },
    ]

    expect(compiled.querySelectorAll('a').forEach(element => {
      const navLink = {
        routerLink: element.getAttribute('routerLink'),
        value: element.textContent,
      }
      expect(navLinks).toContain(jasmine.objectContaining(navLink))
    }))
  });

});
