import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export interface ToolbarOptions {
    title: string;
}

@Injectable({ providedIn: 'root' })
export class ToolbarService {
    
    options = new BehaviorSubject(null);

    constructor() {}

    setOptions(options: ToolbarOptions) {
        this.options.next(options);
    }
}