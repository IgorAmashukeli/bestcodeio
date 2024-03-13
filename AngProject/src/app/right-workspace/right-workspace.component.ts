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

  selectedCase: number = 0;

  cur_code: string = this.initial_codes[this.initial_language];
  constructor() {
    this.selectedLanguage = this.initial_language;
  }

  ngOnInit() {
    this.cur_code = this.initial_codes[this.initial_language];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['selectedLanguage'] &&
      !changes['selectedLanguage'].firstChange
    ) {
      this.cur_code = this.initial_codes[this.selectedLanguage];
    }
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
}
