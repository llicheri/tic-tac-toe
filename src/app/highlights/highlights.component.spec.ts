import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HighScoreComponent } from "./highlights.component";
import { imports, declComponents } from "../app.module";

describe("HighScoreComponent", () => {
  let component: HighScoreComponent;
  let fixture: ComponentFixture<HighScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: declComponents,
      imports: imports
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
