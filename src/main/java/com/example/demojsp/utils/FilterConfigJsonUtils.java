package com.example.demojsp.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

public class FilterConfigJsonUtils {

    private static final Logger logger = LoggerFactory.getLogger(FilterConfigJsonUtils.class);

    public static String toJson(Object source) {
        return JsonUtils.toJson(source);
    }

    public static String toJson(Object source, String includeFilterId, String[] includeProperties, String exceptFilterId, String[] exceptProperties) {

        return toJson(source, false, false, includeFilterId, includeProperties, exceptFilterId, exceptProperties);
    }

    public static String formattedToJson(Object source, String includeFilterId, String[] includeProperties, String exceptFilterId, String[] exceptProperties) {

        return toJson(source, false, true, includeFilterId, includeProperties, exceptFilterId, exceptProperties);
    }


    public static String toJson(Object source, boolean isWrapRootValue, boolean isFormatted, String includeFilterId, String[] includeProperties, String exceptFilterId, String[] exceptProperties) {

        return toJson(source, isWrapRootValue, isFormatted, includeFilterId, includeProperties, exceptFilterId, exceptProperties, null, null);
    }

    public static String toJson(Object source, boolean isWrapRootValue, boolean isFormatted, String includeFilterId, String[] includeProperties,
                                String exceptFilterId, String[] exceptProperties,
                                String exceptFilterId2, String[] exceptProperties2) {

        ObjectMapper mapper = getObjectMapper(isWrapRootValue, isFormatted);
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        SimpleFilterProvider simpleFilterProvider = getSimpleFilterProvider();

        simpleFilterProvider = simpleFilterProvider
            .addFilter(includeFilterId, SimpleBeanPropertyFilter.filterOutAllExcept(includeProperties))
            .addFilter(exceptFilterId,  SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties));
        if (exceptFilterId2 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId2, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties2));
        }
        FilterProvider provider = simpleFilterProvider;
        ObjectWriter writer = mapper.writer(provider);

        String json = "";
        try {
            json = writer.writeValueAsString(source);
        } catch (JsonProcessingException e) {
            logger.error(e.getMessage(), e);
        }
        return json;
    }

    public static String toJson(Object source, boolean isWrapRootValue, boolean isFormatted, String includeFilterId, String[] includeProperties,
                                String exceptFilterId, String[] exceptProperties,
                                String exceptFilterId2, String[] exceptProperties2,
                                String exceptFilterId3, String[] exceptProperties3) {

        ObjectMapper mapper = getObjectMapper(isWrapRootValue, isFormatted);
        SimpleFilterProvider simpleFilterProvider = getSimpleFilterProvider();

        simpleFilterProvider = simpleFilterProvider
            .addFilter(includeFilterId, SimpleBeanPropertyFilter.filterOutAllExcept(includeProperties))
            .addFilter(exceptFilterId,  SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties));
        if (exceptFilterId2 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId2, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties2));
        }
        if (exceptFilterId3 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId3, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties3));
        }
        FilterProvider provider = simpleFilterProvider;
        ObjectWriter writer = mapper.writer(provider);

        String json = "";
        try {
            json = writer.writeValueAsString(source);
        } catch (JsonProcessingException e) {
            logger.error(e.getMessage(), e);
        }
        return json;
    }

    /* chj97 added 160812 - for issue #34733 */
    public static String toJson(Object source, boolean isWrapRootValue, boolean isFormatted, String includeFilterId, String[] includeProperties,
                                String exceptFilterId, String[] exceptProperties,
                                String exceptFilterId2, String[] exceptProperties2,
                                String exceptFilterId3, String[] exceptProperties3,
                                String exceptFilterId4, String[] exceptProperties4) {

        ObjectMapper mapper = getObjectMapper(isWrapRootValue, isFormatted);
        SimpleFilterProvider simpleFilterProvider = getSimpleFilterProvider();

        simpleFilterProvider = simpleFilterProvider
            .addFilter(includeFilterId, SimpleBeanPropertyFilter.filterOutAllExcept(includeProperties))
            .addFilter(exceptFilterId,  SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties));
        if (exceptFilterId2 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId2, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties2));
        }
        if (exceptFilterId3 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId3, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties3));
        }
        if (exceptFilterId4 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId4, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties4));
        }
        SimpleFilterProvider provider = simpleFilterProvider;
        ObjectWriter writer = mapper.writer(provider);

        String json = "";
        try {
            json = writer.writeValueAsString(source);
        } catch (JsonProcessingException e) {
            logger.error(e.getMessage(), e);
        }
        return json;
    }

    /* chj97 added 160812 - for issue #34733 */
    public static String toJson(Object source, boolean isWrapRootValue, boolean isFormatted, String includeFilterId, String[] includeProperties,
                                String exceptFilterId, String[] exceptProperties,
                                String exceptFilterId2, String[] exceptProperties2,
                                String exceptFilterId3, String[] exceptProperties3,
                                String exceptFilterId4, String[] exceptProperties4,
                                String exceptFilterId5, String[] exceptProperties5) {

        ObjectMapper mapper = getObjectMapper(isWrapRootValue, isFormatted);
        SimpleFilterProvider simpleFilterProvider = getSimpleFilterProvider();

        simpleFilterProvider = simpleFilterProvider
            .addFilter(includeFilterId, SimpleBeanPropertyFilter.filterOutAllExcept(includeProperties))
            .addFilter(exceptFilterId,  SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties));
        if (exceptFilterId2 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId2, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties2));
        }
        if (exceptFilterId3 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId3, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties3));
        }
        if (exceptFilterId4 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId4, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties4));
        }
        if (exceptFilterId5 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId5, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties5));
        }
        SimpleFilterProvider provider = simpleFilterProvider;
        ObjectWriter writer = mapper.writer(provider);

        String json = "";
        try {
            json = writer.writeValueAsString(source);
        } catch (JsonProcessingException e) {
            logger.error(e.getMessage(), e);
        }
        return json;
    }

    public static String toJson(Object source, boolean isWrapRootValue, boolean isFormatted, String includeFilterId, String[] includeProperties,
                                String exceptFilterId, String[] exceptProperties,
                                String exceptFilterId2, String[] exceptProperties2,
                                String exceptFilterId3, String[] exceptProperties3,
                                String exceptFilterId4, String[] exceptProperties4,
                                String exceptFilterId5, String[] exceptProperties5,
                                String exceptFilterId6, String[] exceptProperties6) {

        ObjectMapper mapper = getObjectMapper(isWrapRootValue, isFormatted);
        SimpleFilterProvider simpleFilterProvider = getSimpleFilterProvider();

        simpleFilterProvider = simpleFilterProvider
            .addFilter(includeFilterId, SimpleBeanPropertyFilter.filterOutAllExcept(includeProperties))
            .addFilter(exceptFilterId,  SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties));
        if (exceptFilterId2 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId2, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties2));
        }
        if (exceptFilterId3 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId3, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties3));
        }
        if (exceptFilterId4 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId4, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties4));
        }
        if (exceptFilterId5 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId5, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties5));
        }
        if (exceptFilterId6 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId6, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties6));
        }
        SimpleFilterProvider provider = simpleFilterProvider;
        ObjectWriter writer = mapper.writer(provider);

        String json = "";
        try {
            json = writer.writeValueAsString(source);
        } catch (JsonProcessingException e) {
            logger.error(e.getMessage(), e);
        }
        return json;
    }

    public static String toJson(Object source, boolean isWrapRootValue, boolean isFormatted, String includeFilterId, String[] includeProperties,
                                String exceptFilterId, String[] exceptProperties,
                                String exceptFilterId2, String[] exceptProperties2,
                                String exceptFilterId3, String[] exceptProperties3,
                                String exceptFilterId4, String[] exceptProperties4,
                                String exceptFilterId5, String[] exceptProperties5,
                                String exceptFilterId6, String[] exceptProperties6,
                                String exceptFilterId7, String[] exceptProperties7) {

        ObjectMapper mapper = getObjectMapper(isWrapRootValue, isFormatted);
        SimpleFilterProvider simpleFilterProvider = getSimpleFilterProvider();

        simpleFilterProvider = simpleFilterProvider
            .addFilter(includeFilterId, SimpleBeanPropertyFilter.filterOutAllExcept(includeProperties))
            .addFilter(exceptFilterId,  SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties));
        if (exceptFilterId2 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId2, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties2));
        }
        if (exceptFilterId3 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId3, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties3));
        }
        if (exceptFilterId4 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId4, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties4));
        }
        if (exceptFilterId5 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId5, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties5));
        }
        if (exceptFilterId6 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId6, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties6));
        }
        if (exceptFilterId7 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId7, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties7));
        }

        SimpleFilterProvider provider = simpleFilterProvider;
        ObjectWriter writer = mapper.writer(provider);

        String json = "";
        try {
            json = writer.writeValueAsString(source);
        } catch (JsonProcessingException e) {
            logger.error(e.getMessage(), e);
        }
        return json;
    }

    public static String toJson(Object source, boolean isWrapRootValue, boolean isFormatted, String includeFilterId, String[] includeProperties,
                                String exceptFilterId, String[] exceptProperties,
                                String exceptFilterId2, String[] exceptProperties2,
                                String exceptFilterId3, String[] exceptProperties3,
                                String exceptFilterId4, String[] exceptProperties4,
                                String exceptFilterId5, String[] exceptProperties5,
                                String exceptFilterId6, String[] exceptProperties6,
                                String exceptFilterId7, String[] exceptProperties7,
                                String exceptFilterId8, String[] exceptProperties8,
                                String exceptFilterId9, String[] exceptProperties9) {

        ObjectMapper mapper = getObjectMapper(isWrapRootValue, isFormatted);
        SimpleFilterProvider simpleFilterProvider = getSimpleFilterProvider();

        simpleFilterProvider = simpleFilterProvider
            .addFilter(includeFilterId, SimpleBeanPropertyFilter.filterOutAllExcept(includeProperties))
            .addFilter(exceptFilterId,  SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties));
        if (exceptFilterId2 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId2, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties2));
        }
        if (exceptFilterId3 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId3, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties3));
        }
        if (exceptFilterId4 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId4, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties4));
        }
        if (exceptFilterId5 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId5, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties5));
        }
        if (exceptFilterId6 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId6, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties6));
        }
        if (exceptFilterId7 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId7, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties7));
        }
        if (exceptFilterId8 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId8, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties8));
        }
        if (exceptFilterId9 != null) {
            simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilterId9, SimpleBeanPropertyFilter.serializeAllExcept(exceptProperties9));
        }
        SimpleFilterProvider provider = simpleFilterProvider;
        ObjectWriter writer = mapper.writer(provider);

        String json = "";
        try {
            json = writer.writeValueAsString(source);
        } catch (JsonProcessingException e) {
            logger.error(e.getMessage(), e);
        }
        return json;
    }

    public static String toJson(Object source, boolean isWrapRootValue, boolean isFormatted, String includeFilterId, String[] includeProperties, Map<String, Object> exceptFilters) {

        ObjectMapper mapper = getObjectMapper(isWrapRootValue, isFormatted);
        SimpleFilterProvider simpleFilterProvider = getSimpleFilterProvider();

        simpleFilterProvider = simpleFilterProvider
            .addFilter(includeFilterId, SimpleBeanPropertyFilter.filterOutAllExcept(includeProperties));

        if(exceptFilters != null) {
            for (Map.Entry<String, Object> exceptFilter : exceptFilters.entrySet()) {
                simpleFilterProvider = simpleFilterProvider.addFilter(exceptFilter.getKey(), SimpleBeanPropertyFilter.serializeAllExcept((String[])exceptFilter.getValue()));
            }
        }

        SimpleFilterProvider provider = simpleFilterProvider;
        ObjectWriter writer = mapper.writer(provider);

        String json = "";
        try {
            json = writer.writeValueAsString(source);
        } catch (JsonProcessingException e) {
            logger.error(e.getMessage(), e);
        }
        return json;
    }

    public static String toJson(Object source, String includeFilterId, String[] includeProperties, String exceptFilterId, String[] exceptProperties, String exceptFilterId2, String[] exceptProperties2) {

        return toJson(source, false, false, includeFilterId, includeProperties, exceptFilterId, exceptProperties, exceptFilterId2, exceptProperties2);
    }

    public static String formattedToJson(Object source, String includeFilterId, String[] includeProperties, String exceptFilterId, String[] exceptProperties, String exceptFilterId2, String[] exceptProperties2) {

        return toJson(source, false, true, includeFilterId, includeProperties, exceptFilterId, exceptProperties, exceptFilterId2, exceptProperties2);
    }

    public static String formattedToJson(Object source, String includeFilterId, String[] includeProperties, String exceptFilterId, String[] exceptProperties,
                                         String exceptFilterId2, String[] exceptProperties2, String exceptFilterId3, String[] exceptProperties3) {

        return toJson(source, false, true, includeFilterId, includeProperties, exceptFilterId, exceptProperties, exceptFilterId2, exceptProperties2, exceptFilterId3, exceptProperties3);
    }
    /* chj97 added 160812 - for issue #34733 */
    public static String formattedToJson(Object source, String includeFilterId, String[] includeProperties, String exceptFilterId, String[] exceptProperties,
                                         String exceptFilterId2, String[] exceptProperties2, String exceptFilterId3, String[] exceptProperties3, String exceptFilterId4, String[] exceptProperties4) {

        return toJson(source, false, true, includeFilterId, includeProperties, exceptFilterId, exceptProperties, exceptFilterId2, exceptProperties2, exceptFilterId3, exceptProperties3, exceptFilterId4, exceptProperties4);
    }

    public static String formattedToJson(Object source, String includeFilterId, String[] includeProperties, String exceptFilterId, String[] exceptProperties,
                                         String exceptFilterId2, String[] exceptProperties2, String exceptFilterId3, String[] exceptProperties3, String exceptFilterId4, String[] exceptProperties4,
                                         String exceptFilterId5, String[] exceptProperties5) {
        return toJson(source, false, true, includeFilterId, includeProperties, exceptFilterId, exceptProperties,
            exceptFilterId2, exceptProperties2, exceptFilterId3, exceptProperties3,
            exceptFilterId4, exceptProperties4, exceptFilterId5, exceptProperties5);
    }

    public static String formattedToJson(Object source, String includeFilterId, String[] includeProperties, String exceptFilterId, String[] exceptProperties,
                                         String exceptFilterId2, String[] exceptProperties2, String exceptFilterId3, String[] exceptProperties3, String exceptFilterId4, String[] exceptProperties4,
                                         String exceptFilterId5, String[] exceptProperties5, String exceptFilterId6, String[] exceptProperties6) {
        return toJson(source, false, true, includeFilterId, includeProperties, exceptFilterId, exceptProperties,
            exceptFilterId2, exceptProperties2, exceptFilterId3, exceptProperties3,
            exceptFilterId4, exceptProperties4, exceptFilterId5, exceptProperties5,
            exceptFilterId6, exceptProperties6);
    }

    public static String formattedToJson(Object source, String includeFilterId, String[] includeProperties, String exceptFilterId, String[] exceptProperties,
                                         String exceptFilterId2, String[] exceptProperties2, String exceptFilterId3, String[] exceptProperties3, String exceptFilterId4, String[] exceptProperties4,
                                         String exceptFilterId5, String[] exceptProperties5, String exceptFilterId6, String[] exceptProperties6, String exceptFilterId7, String[] exceptProperties7) {
        return toJson(source, false, true, includeFilterId, includeProperties, exceptFilterId, exceptProperties,
            exceptFilterId2, exceptProperties2, exceptFilterId3, exceptProperties3,
            exceptFilterId4, exceptProperties4, exceptFilterId5, exceptProperties5,
            exceptFilterId6, exceptProperties6, exceptFilterId7, exceptProperties7);
    }

    public static String formattedToJson(Object source, String includeFilterId, String[] includeProperties, String exceptFilterId, String[] exceptProperties,
                                         String exceptFilterId2, String[] exceptProperties2, String exceptFilterId3, String[] exceptProperties3, String exceptFilterId4, String[] exceptProperties4,
                                         String exceptFilterId5, String[] exceptProperties5, String exceptFilterId6, String[] exceptProperties6, String exceptFilterId7, String[] exceptProperties7,
                                         String exceptFilterId8, String[] exceptProperties8, String exceptFilterId9, String[] exceptProperties9) {
        return toJson(source, false, true, includeFilterId, includeProperties, exceptFilterId, exceptProperties,
            exceptFilterId2, exceptProperties2, exceptFilterId3, exceptProperties3,
            exceptFilterId4, exceptProperties4, exceptFilterId5, exceptProperties5,
            exceptFilterId6, exceptProperties6, exceptFilterId7, exceptProperties7,
            exceptFilterId8, exceptProperties8, exceptFilterId9, exceptProperties9);
    }

    public static String formattedToJson(Object source, String includeFilterId, String[] includeProperties, Map<String, Object> exceptFilters) {
        return toJson(source, false, true, includeFilterId, includeProperties, exceptFilters);
    }

    /**
     * 필요한 property 만 포함하여 json 스트링으로 반환
     *
     * @param source
     * @param filterId
     * @param propertyArray
     * @return
     */
    public static String toJsonInclude(Object source, String filterId, String... propertyArray) {

        return toJsonInclude(source, false, false, filterId, propertyArray);
    }

    /**
     * 필요한 property 만 포함하여 formatted json 스트링으로 반환
     *
     * @param source
     * @param filterId
     * @param propertyArray
     * @return
     */
    public static String formattedToJsonInclude(Object source, String filterId, String... propertyArray) {

        return toJsonInclude(source, false, true, filterId, propertyArray);
    }

    public static String toJsonInclude(Object source, boolean isWrapRootValue, boolean isFormatted, String filterId, String... propertyArray) {

        ObjectMapper mapper = getObjectMapper(isWrapRootValue, isFormatted);

        SimpleFilterProvider simpleFilterProvider = getSimpleFilterProvider();
        FilterProvider provider = simpleFilterProvider.addFilter(filterId,  SimpleBeanPropertyFilter.filterOutAllExcept(propertyArray));
        ObjectWriter writer = mapper.writer(provider);

        String json = "";
        try {
            json = writer.writeValueAsString(source);
        } catch (JsonProcessingException e) {
            logger.error(e.getMessage(), e);
        }
        return json;
    }

    /**
     * 불필요한 property 를 제외하여 json 스트링으로 반환
     *
     * @param source
     * @param filterId
     * @param propertyArray
     * @return
     */
    public static String toJsonExcept(Object source, String filterId, String... propertyArray) {

        return toJsonExcept(source, false, false, filterId, propertyArray);
    }

    /**
     * 불필요한 property 를 제외하여 formatted json 스트링으로 반환
     *
     * @param source
     * @param filterId
     * @param propertyArray
     * @return
     */
    public static String formattedToJsonExcept(Object source, String filterId, String... propertyArray) {

        return toJsonExcept(source, false, true, filterId, propertyArray);
    }

    public static String toJsonExcept(Object source, boolean isWrapRootValue, boolean isFormatted, String filterId, String... propertyArray) {

        ObjectMapper mapper = getObjectMapper(isWrapRootValue, isFormatted);
        SimpleFilterProvider simpleFilterProvider = getSimpleFilterProvider();
        FilterProvider filters = simpleFilterProvider.addFilter(filterId,  SimpleBeanPropertyFilter.serializeAllExcept(propertyArray));
        ObjectWriter writer = mapper.writer(filters);

        String json = "";
        try {
            json = writer.writeValueAsString(source);
        } catch (JsonProcessingException e) {
            logger.error(e.getMessage(), e);
        }
        return json;
    }

    public static SimpleFilterProvider getSimpleFilterProvider() {
        SimpleFilterProvider simpleFilterProvider = new SimpleFilterProvider();
        simpleFilterProvider.setFailOnUnknownId(false);
        return simpleFilterProvider;
    }

    public static ObjectMapper getObjectMapper(boolean isWrapRootValue, boolean isFormatted, Class<?>... subTypeCasses) {
        return JsonUtils.getObjectMapper(isWrapRootValue, isFormatted, subTypeCasses);
    }
}
