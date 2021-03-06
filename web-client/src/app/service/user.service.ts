import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {User} from '../data/user/user'
import {BehaviorSubject, Observable} from 'rxjs'
import {Credentials} from '../data/user/credentials'
import {map, tap} from 'rxjs/operators'
import {UserBasic} from '../data/user/user-basic'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User = null
  private readonly subject = new BehaviorSubject<any>(null)
  private credentials: Credentials = null

  constructor(private http: HttpClient) {
  }

  signIn(credentials: Credentials): Observable<User> {

    this.credentials = credentials
    const token = this.resolveBasicAuthToken()

    return this.http.get<User>('http://localhost:8080/api/userinfo', {headers: {'Authorization': token}})
      .pipe(tap(user => this.user = user))
      .pipe(tap(user => this.subject.next(user)))
  }

  signOut() {

    if (!this.user) {
      return
    }

    this.user = null
    this.subject.next(null)
  }

  getAuthenticationEvent(): Observable<User> {
    return this.subject.asObservable()
  }

  getBasicAuthToken(): string {
    return this.resolveBasicAuthToken()
  }

  hasUser() {
    return this.user != null
  }

  getUserRole(): string {
    if (this.hasUser()) {
      return this.user.role
    } else {
      return "NONE"
    }
  }

  getId(): number {
    if (this.hasUser()) {
      return this.user.id
    } else {
      return 0
    }
  }

  getUserList(user?: User): Observable<UserBasic[]> {
    if (user !== undefined) {
      let useAnd = false
      let query = ''
      if (user.id != null) {
        query += 'id=' + user.id
        useAnd = true
      }
      if (user.username) {
        if (useAnd) {
          query += '&'
        }
        query += 'username=' + user.username
        useAnd = true
      }
      if (user.firstName) {
        if (useAnd) {
          query += '&'
        }
        query += 'first_name=' + user.firstName
        useAnd = true
      }
      if (user.lastName) {
        if (useAnd) {
          query += '&'
        }
        query += 'last_name=' + user.lastName
        useAnd = true
      }
      return this.http.get<UserBasic[]>(`http://localhost:8080/api/users?${query}`)
    } else {
      return this.http.get<UserBasic[]>(`http://localhost:8080/api/users`)
    }
  }

  getUser(id: number, role_id: number): Observable<User> {
    return this.http.get<User>(`http://localhost:8080/api/user_details?employee_id=${id}&role_id=${role_id}`)
  }

  updatePassword(id: number, role_id: number, new_hash: string): Observable<User> {
    return this.http.put<User>(`http://localhost:8080/api/user_details/password?employee_id=${id}&role_id=${role_id}`, {
      "password": new_hash
    })
  }

  postNewUser(user: User): Observable<User> {

    return this.http.post<User>(`http://localhost:8080/api/users`,{
      "licenseCode": user.licenseCode,
      "role": user.role,
      "username": user.username,
      "password": user.password,
      "firstName": user.firstName,
      "lastName": user.lastName,
      "city": user.city,
      "streetAddress1": user.streetAddress1,
      "streetAddress2": null,
      "zipCode": user.zipCode,
      "region": user.region,
      "contactNumber": user.contactNumber
    }).pipe(map(
      u => {
        let usr = new User()
        usr.id = u.id
        usr.role = u.role
        usr.username = u.username
        usr.status = u.status
        usr.licenseCode = u.licenseCode
        usr.firstName = u.firstName
        usr.lastName = u.lastName
        usr.city = u.city
        usr.streetAddress1 = u.streetAddress1
        usr.streetAddress2 = u.streetAddress2
        usr.zipCode = u.zipCode
        usr.region = u.region
        usr.contactNumber = u.contactNumber

        return usr
      }
    ))
  }

  editUser(user: User, role: number): Observable<User> {
    return this.http.put<User>(`http://localhost:8080/api/user_details?employee_id=${user.id}&role_id=${role}`, user)

  }

  private resolveBasicAuthToken(): string {

    if (this.credentials == null) return ''

    return 'Basic ' + btoa(`${this.credentials.username}:${this.credentials.password}`)
  }

}
