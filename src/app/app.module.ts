import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'reflect-metadata';
import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdInputModule } from '@angular2-material/input';
import { MdIconModule } from '@angular2-material/icon';
import { TagInputComponent } from './tag-input/tag-input.component';
import { TagInputItemComponent } from './tag-input/tag-input-item.component';
import { CommentEntity } from './comment/comment.entity'
import { Ng2commentAppComponent } from './comment/ng2comment.component';

@NgModule({
  declarations: [
    Ng2commentAppComponent,
    TagInputComponent,
    TagInputItemComponent,
  ],
  imports: [
    MdButtonModule.forRoot(), MdCardModule.forRoot(), MdToolbarModule.forRoot(),
    MdIconModule.forRoot(), MdInputModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [Ng2commentAppComponent]
})
export class AppModule { }
