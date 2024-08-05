package com.scat;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Component
public class SpringApplicationContext implements ApplicationContextAware {

    private static ApplicationContext CONTEXT;

    @Override
    public void setApplicationContext(ApplicationContext context) throws BeansException {
        CONTEXT = context;
    }

    public static <T> T getBean(String beanName, Class<T> requiredType) {
        return CONTEXT.getBean(beanName, requiredType);
    }

    public static Object getBean(String beanName) {
        return CONTEXT.getBean(beanName);
    }
}
