import { Component } from '@angular/core';
import { AngularSplitModule } from 'angular-split';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'right-workspace',
  standalone: true,
  imports: [AngularSplitModule, MonacoEditorModule, FormsModule],
  templateUrl: './right-workspace.component.html',
  styleUrl: './right-workspace.component.css',
})
export class RightWorkSpaceComponent {
  editorOptions = { theme: 'vs-dark', language: 'cpp' };
  code: string = '#include <iostream>\n\nint main() {\n\n}';
}
