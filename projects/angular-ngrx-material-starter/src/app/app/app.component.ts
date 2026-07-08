import browser from 'browser-detect';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { environment as env } from '../../environments/environment';

import {
  authLogin,
  authLogout,
  routeAnimations,
  LocalStorageService,
  AppState,
  selectIsAuthenticated,
  selectSettingsStickyHeader,
  selectSettingsLanguage,
  selectEffectiveTheme
} from '../core/core.module';
import {
  actionSettingsChangeAnimationsPageDisabled,
  actionSettingsChangeLanguage
} from '../core/settings/settings.actions';
import { Language } from '../core/settings/settings.model';

@Component({
  selector: 'anms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class AppComponent implements OnInit {
  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = 'assets/logo.png';
  languages = ['en', 'de', 'sk', 'fr', 'es', 'pt-br', 'zh-cn', 'he'];
  navigation = [
    { link: 'about', label: 'anms.menu.about' },
    { link: 'feature-list', label: 'anms.menu.features' },
    { link: 'examples', label: 'anms.menu.examples' }
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'anms.menu.settings' }
  ];

  isAuthenticated$!: Observable<boolean>;
  stickyHeader$!: Observable<boolean>;
  language$!: Observable<string>;
  theme$!: Observable<string>;

  constructor(
    private store: Store<AppState>,
    private storageService: LocalStorageService
  ) {}

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name ?? '');
  }

  ngOnInit(): void {
    this.storageService.testLocalStorage();
    if (AppComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        actionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    }

    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.stickyHeader$ = this.store.select(selectSettingsStickyHeader);
    this.language$ = this.store.select(selectSettingsLanguage);
    this.theme$ = this.store.select(selectEffectiveTheme);
  }

  onLoginClick() {
    this.store.dispatch(authLogin());
  }

  onLogoutClick() {
    this.store.dispatch(authLogout());
  }

  onLanguageSelect({ value: language }: { value: string }) {
    this.store.dispatch(actionSettingsChangeLanguage({ language: language as Language }));
  }
}
