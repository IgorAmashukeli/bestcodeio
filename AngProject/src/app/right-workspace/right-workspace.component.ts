import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AngularSplitModule } from 'angular-split';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MonacoService } from '../services/monaco.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'right-workspace',
  standalone: true,
  imports: [AngularSplitModule, MonacoEditorModule, FormsModule, CommonModule],
  templateUrl: './right-workspace.component.html',
  styleUrls: ['./right-workspace.component.css'],
})
export class RightWorkSpaceComponent implements OnInit, OnChanges {
  @Input() selectedLanguage: string;
  @Input() code_languages: Array<Array<string>> = [[]];
  @Input() initial_codes: any = {};
  @Input() initial_language: string = '';
  @Input() example_array: Array<string> = [];

  previous_language: string = '';
  routeKey: string = '';

  selectedCase: number = 0;

  cur_code: string = this.initial_codes[this.initial_language];
  constructor(private router: Router) {
    this.routeKey = this.router.url;
    this.selectedLanguage = this.initial_language;
  }

  ngOnInit() {
    this.previous_language = this.initial_language;
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const storedCodes = localStorage.getItem(this.routeKey);
      this.initial_codes = storedCodes
        ? JSON.parse(storedCodes)
        : this.initial_codes;
      this.cur_code = this.initial_codes[this.initial_language];

      window.addEventListener(
        'beforeunload',
        this.saveCodesToLocalStorage.bind(this)
      );
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['selectedLanguage'] &&
      !changes['selectedLanguage'].firstChange
    ) {
      if (typeof localStorage !== 'undefined') {
        // Update current code
        const storedCodes = localStorage.getItem(this.routeKey);
        this.initial_codes = storedCodes
          ? JSON.parse(storedCodes)
          : this.initial_codes;

        // Store the updated initial_codes array in local storage

        if (
          this.selectedLanguage &&
          this.initial_codes[this.selectedLanguage]
        ) {
          this.initial_codes[this.previous_language] = this.cur_code;
        }
        localStorage.setItem(this.routeKey, JSON.stringify(this.initial_codes));

        this.cur_code = this.initial_codes[this.selectedLanguage];

        // Update previous language
        this.previous_language = this.selectedLanguage;
      }
    }
  }

  saveCodesToLocalStorage() {
    this.initial_codes[this.selectedLanguage] = this.cur_code;
    // Save initial_codes array to local storage before the page reloads
    localStorage.setItem(this.routeKey, JSON.stringify(this.initial_codes));
  }

  changeSelectedCase(case_number: number) {
    this.selectedCase = case_number;
  }

  parseInputOutput(inputOutputString: string) {
    // Extract input, output, and explanation using regular expressions
    const inputMatch = inputOutputString.match(
      /<b><b>Input<\/b><\/b>: (.*?)<br>/
    );
    const outputMatch = inputOutputString.match(
      /<b><b>Output<\/b><\/b>: (.*?)<br>/
    );
    const explanationMatch = inputOutputString.match(
      /<b><b>Explanation<\/b><\/b>: (.*?)$/
    );

    // Extracting the captured groups
    const input = inputMatch ? inputMatch[1].trim() : '';
    const output = outputMatch ? outputMatch[1].trim() : '';
    const explanation = explanationMatch ? explanationMatch[1].trim() : '';

    // Return the input, output, and explanation as an object
    return { inp: input, outp: output };
  }

  ngOnDestroy() {
    // Remove the event listener when the component is destroyed
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      window.removeEventListener(
        'beforeunload',
        this.saveCodesToLocalStorage.bind(this)
      );
    }
  }
}
