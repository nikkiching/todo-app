import { Meteor } from 'meteor/meteor';
import {Random} from 'meteor/random';
import {assert} from 'chai';

import { Tasks } from '../../../imports/api/tasks';

if (Meteor.isServer) {
    describe('Tasks', () => {
        describe('methods', () => {
            const userId = Random.id();
            let taskId;
            
            beforeEach(() => {
                Tasks.remove({});
                taskId = Tasks.insert({
                    text: 'test task',
                    createdAt: new Date(),
                    owner: userId,
                    username: 'testuser',
                });
            });
                
            it('can delete owned task', ()=> {
                const deleteTask = Meteor.server.method_handlers['tasks.remove'];

                const invocation = {userId};
                // Run the method with `this` set to the fake user
                deleteTask.apply(invocation, [taskId]);
                assert.equal(Tasks.find().count(), 0);
            });
        })
    });
}