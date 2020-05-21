import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/data/patient/patient';
import { Router, ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/data/doctor/doctor';
import { AddVisitService } from 'src/app/service/add-visit.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/data/user/user';
import { UserService } from 'src/app/service/user.service';
import { VisitToAdd } from 'src/app/data/visit/visit-to-add';
import { VisitDetails } from 'src/app/data/visit/visit-details';


@Component({
  selector: 'app-add-visit',
  templateUrl: './add-visit.component.html',
  styleUrls: ['./add-visit.component.css'],
})
export class AddVisitComponent implements OnInit {
  patientList: Patient[]
  selectedPatient: Patient = new Patient()
  patientSought: Patient = new Patient()
  patientSub: Subscription
  
  doctorList: Doctor[]
  selectedDoctor: Doctor = new Doctor()
  doctorSought: Doctor = new Doctor()
  doctorSub: Subscription

  visitToAdd: VisitToAdd = new VisitToAdd()
  visitDetails: VisitDetails
  visitDetailsSub: Subscription

  constructor(private router: Router, private userService: UserService, private addVisitService: AddVisitService) { }
  stage = 1;

  ngOnInit(): void {
    //Ustawienie numeru recepcjonisty
    this.visitToAdd.receptionistId = this.userService.getId();

    //Wczytanie listy pacjentów
    this.patientSub = this.addVisitService.getPatients().subscribe(patients => this.patientList = patients);
    
    //Wczytanie listy lekarzy
    this.doctorSub = this.addVisitService.getDoctors().subscribe(doctors => this.doctorList = doctors);
  }

  //Wyszukiwanie pacjenta za pomocą imienia nazwiska i numeru PESEL
  searchPatients(): void {
    this.patientSub = this.addVisitService.getPatients(this.patientSought).subscribe(patients => this.patientList = patients);
  }

  //Wyszukiwanie lekarza za pomocą imienia nazwiska i numeru licencji
  searchDoctors(): void {
    this.doctorSub = this.addVisitService.getDoctors(this.doctorSought).subscribe(doctors => this.doctorList = doctors);
  }

  //wybór pacjenta
  selectPatient(patient: Patient): void {
    this.selectedPatient=patient
    this.visitToAdd.patientId=patient.id;
    this.stage = 2;
  }

  //wybór lekarza
  selectDoctor(doctor: Doctor): void {
    this.selectedDoctor=doctor
    this.visitToAdd.doctorId=doctor.id;
    this.stage = 3;
  }

  // wysyła POST do API
  confirmAddVisit(){
    this.visitDetailsSub = this.addVisitService.postVisit(this.visitToAdd).subscribe(_visit => this.visitDetails = _visit)
    this.navigateToRecVisitList()
  }

  //powrót to listy wizyt recepcjonisty
  navigateToRecVisitList() {
    this.router.navigate(['/receptionist-visit-list/'])
  }
}