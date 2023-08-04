import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { EventDTO } from 'src/app/models/event.model';
import { SubCompanyDTO } from 'src/app/models/search-subcompany.model';
import { BranchService } from 'src/app/services/branch.service';

@Component({
  selector: 'app-events-tasks',
  templateUrl: './events-tasks.component.html',
})
export class EventsTasksComponent implements OnInit {

  id : string ;

  lsEvent = new BehaviorSubject<EventDTO[] | []>([]);

  constructor(private route: ActivatedRoute , private branchService : BranchService) {}


  ngOnInit(): void {

    this.route.parent?.params.subscribe(parent=>{
      this.id = parent['id']
    })

    this.branchService.getEvent().subscribe(data => {
      const filterData = data.filter(sub => sub.subCompanyId === this.id)
      const eventsWithDueDate = filterData.map(event => {
        const dueDateString = this.showDate(event.createdDateTime);
        return { ...event, dueDateString }; // add dueDateString to each event
      });
      this.lsEvent.next(eventsWithDueDate); // send eventsWithDueDate to subscriber
    })

    // console.log(this.dueDateStrings)

  }

  showDate(dateTime : any) : string {
    // กำหนดวันที่เริ่มต้นและวันที่ due ที่ต้องการ
    const startDate = new Date(dateTime);
    // const startDate = new Date('2023-05-1 10:29:28.053');
    const dueDate = new Date();

    // คำนวณหาจำนวนเวลาที่ผ่านมาเป็นชั่วโมง
    const timeDiff = Math.abs(dueDate.getTime() - startDate.getTime());
    const hoursDiff = Math.ceil(timeDiff / (1000 * 3600)); 
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const weeksDiff = Math.ceil(timeDiff / (1000 * 3600 * 24 * 7)); 


    // ตรวจสอบว่าเวลาที่ผ่านมาไม่เกิน 24 ชั่วโมงหรือไม่
    let dueDateString = '';
    if (hoursDiff <= 24) {
      dueDateString = 'new';
    }
    else if (daysDiff < 7) {
      dueDateString = `Due ${daysDiff} days ago.`
    } 
    else if (daysDiff >= 7) {
      dueDateString = `Due ${weeksDiff} weeks ago.`
    } 

    return dueDateString

  }
}
