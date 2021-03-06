package pl.clinic.visit.controller.dto;

import pl.clinic.doctor.model.Doctor;
import pl.clinic.examination_category.controller.dto.ExaminationBasic;
import pl.clinic.labolratory_examination.controller.dto.LaboratoryExaminationVisitDetails;
import pl.clinic.patient.model.Patient;
import pl.clinic.receptionist.controller.dto.ReceptionistBasic;
import pl.clinic.visit.model.Visit;
import pl.clinic.visit.model.VisitState;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class VisitDetails {
    //visit
    protected long visitId;
    // patient
    protected Patient patient;
    // doctor
    protected Doctor doctor;
    // receptionist
    protected ReceptionistBasic receptionist;
    // visit
    protected VisitState state;
    protected String description;
    protected String diagnose;
    protected LocalDateTime registrationDate;
    protected LocalDateTime finalizationCancellationDate;
    protected  LocalDateTime appointmentDateTime;
    protected List<LaboratoryExaminationVisitDetails> laboratoryExaminations;
    protected List<ExaminationBasic> physicalExaminations;

    public VisitDetails(Visit visit) {
        this.visitId = visit.getId();
        this.patient = visit.getPatient();
        this.doctor = visit.getDoctor();
        this.receptionist = new ReceptionistBasic(visit.getReceptionist());
        this.state = visit.getState();
        this.description = visit.getDescription();
        this.diagnose = visit.getDiagnose();
        this.registrationDate = visit.getRegistrationDate();
        this.finalizationCancellationDate = visit.getFinalizationCancellationDate();
        this.appointmentDateTime = visit.getAppointmentDateTime();
        this.laboratoryExaminations = new ArrayList<LaboratoryExaminationVisitDetails>();
        this.physicalExaminations = new ArrayList<ExaminationBasic>();
        if(visit.getLabolatoryExaminations()!=null){
            visit.getLabolatoryExaminations().forEach(value->this.laboratoryExaminations.add(new LaboratoryExaminationVisitDetails(value)));
        }
        if(visit.getPhysicalExaminations()!=null) {
            visit.getPhysicalExaminations().forEach(value -> this.physicalExaminations.add(new ExaminationBasic(value)));
        }
    }
    public Long getVisitId() { return visitId; };

    public Patient getPatient() { return patient; }

    public Doctor getDoctor() { return doctor; }

    public ReceptionistBasic getReceptionist() { return receptionist; }

    public VisitState getState() { return state; }

    public String getDescription() { return description; }

    public String getDiagnose() { return diagnose; }

    public LocalDateTime getRegistrationDate() { return registrationDate; }

    public LocalDateTime getFinalizationCancellationDate() { return finalizationCancellationDate; }

    public LocalDateTime getAppointmentDateTime(){return appointmentDateTime; }

    public List<LaboratoryExaminationVisitDetails> getLaboratoryExaminations() { return laboratoryExaminations; }

    public List<ExaminationBasic> getPhysicalExaminations() { return physicalExaminations; }
}
