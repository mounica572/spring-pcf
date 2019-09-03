
package com.example.helloapi;

import com.example.helloapi.controller.MessageController;
import org.junit.Test;
import static org.junit.Assert.assertEquals;

public class JUnitControllerTest {

    @Test
    public void MessagesControllerTest() {
        MessageController messageController = new MessageController();
        String result = messageController.getHi();
        assertEquals(result, "Hi There!");
    }
}