import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-training-final-assessment'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-training-final-assessment');
  });

  it('should render nav links', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const navLinks = [
      { routerLink: "register", value: "Register" },
      { routerLink: "view", value: "View" },
    ]

    expect(compiled.querySelectorAll('a.nav-link').forEach(element => {
      const navLink = {
        routerLink: element.getAttribute('routerLink'),
        value: element.textContent,
      }
      expect(navLinks).toContain(jasmine.objectContaining(navLink))
    }))
  });

  it('should render router outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector("router-outlet")).toBeTruthy()
  });
});
