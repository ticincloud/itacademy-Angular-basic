import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { Session, UserModel} from '../models/models';


@Injectable({
    providedIn: 'root'
  })
  export class StorageService {
    private localStorageService;
    private currentSession: Session = null;
    private nomUser = 'ag_UserAgora';

    constructor(private router: Router) {
        this.localStorageService = localStorage;
        this.currentSession = this.loadSessionData();
    }

    setCurrentSession(session: Session): void {
        this.currentSession = session;
        this.localStorageService.setItem(this.nomUser, JSON.stringify(session));
    }

    updateCurrentUser(nom: string): void {
        this.currentSession.user.nom = nom;
        this.localStorageService.setItem(this.nomUser, JSON.stringify(this.currentSession));
    }

    loadSessionData(): Session {
        const sessionStr = this.localStorageService.getItem(this.nomUser);
        return (sessionStr) ? JSON.parse(sessionStr) as Session : null;
    }

    getCurrentSession(): Session {
        return this.currentSession;
    }

    removeCurrentSession(): void {
        this.localStorageService.removeItem(this.nomUser);
        this.currentSession = null;
    }

    getCurrentUser(): UserModel {
        const session: Session = this.getCurrentSession();
        return (session && session.user) ? session.user : null;
    }

    getCurrentUserNom(): string {
        const session: Session = this.getCurrentSession();
        return (session && session.user) ? session.user.nom : '';
    }

    isAuthenticated(): boolean {
        const tokenOk = (this.getCurrentToken() != null) ? true : false;
        return (tokenOk === true) ? true : false;
    }

    getCurrentToken(): string {
        const session = this.getCurrentSession();
        return (session && session.token) ? session.token : null;
    }

    logout(): void {
        this.removeCurrentSession();
        this.router.navigate(['/home']);
    }
}
