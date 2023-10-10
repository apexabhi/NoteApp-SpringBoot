import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { UsersModule } from './users/users.module';
import { AppComponent } from './app.component';
import { authInterceptorProviders } from './services/auth.interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginGuard } from './services/login.guard';
import { NotesModule } from './notes/notes.module';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UsersModule,
    NotesModule
  ],
  providers: [authInterceptorProviders,LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
