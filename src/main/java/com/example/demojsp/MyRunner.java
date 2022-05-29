package com.example.demojsp;

import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import java.util.List;

@Component
public class MyRunner implements ApplicationRunner {
    @Autowired
    private EntityManager entityManager;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("+++++++++++++++++++++++++++++++++++++");
        System.out.println("++++++++++++ My Runner ++++++++++++++");
        System.out.println("+++++++++++++++++++++++++++++++++++++");
        System.out.println("+++++++++++++++++++++++++++++++++++++");
        testQClass();
    }

    private void testQClass() {
        QTimatrixItem matrixItem = QTimatrixItem.timatrixItem;

        JPAQuery<TimatrixItem> query = new JPAQuery<>(entityManager);
        query.from(matrixItem);
        List<TimatrixItem> items = query.fetchResults().getResults();

        System.out.println("Timatrix Item Count " + items.size());
    }
}