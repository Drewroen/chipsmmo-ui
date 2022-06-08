import { AuthService } from './services/auth.service';
import { MovementService } from './services/movement.service';
import { SocketIOService } from './services/socketio.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketIoModule } from 'ngx-socket-io';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserControls } from 'src/objects/userControls';
import { UserSettings } from 'src/objects/userSettings';
import { UserInfo } from 'src/objects/userInfo';
import { AppStateService } from 'src/objects/appStateService';
import { Graphics } from 'src/objects/graphics/graphics';
import { MapGraphics } from 'src/objects/graphics/mapGraphics';
import { InformationGraphics } from 'src/objects/graphics/informationGraphics';
import { AssetGraphics } from 'src/objects/graphics/assetGraphics';
import { ResultGraphics } from 'src/objects/graphics/resultGraphics';
import { LoginService } from './services/login.service';
import { Forms } from 'src/objects/forms';
import { KeyEventService } from './services/keyEvent.service';
import { PixiApp } from 'src/objects/pixiApp';
import { GameInformation } from 'src/objects/gameInformation';
import { MapInformation } from 'src/objects/mapInformation';
import { AppSubscriptions } from 'src/objects/appSubscriptions';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    CommonModule
  ],
  providers: [
    SocketIOService,
    MovementService,
    AuthService,
    LoginService,
    KeyEventService,
    UserSettings,
    UserControls,
    UserInfo,
    AppStateService,
    Graphics,
    MapGraphics,
    InformationGraphics,
    AssetGraphics,
    ResultGraphics,
    Forms,
    PixiApp,
    GameInformation,
    MapInformation,
    AppSubscriptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
